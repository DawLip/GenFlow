import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { services_config } from '@libs/shared/src/services_config';
import { RegisterRequest, LoginRequest, ValidateRequest, AuthResponse, UserPayload, VerifyEmailRequest, VerifyEmailResponse, SendVerificationEmailRequest, SendVerificationEmailResponse } from '@proto/auth/auth';
import { UserServiceClient } from '@proto/user/user.client';

import * as jwt from 'jsonwebtoken';
import { firstValueFrom } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import { TeamServiceClient } from '@proto/team/team.client';
import { ProjectServiceClient } from '@proto/project/project.client';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';


@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly logger: PinoLogger,
    @Inject('EMAIL_CLIENT') private readonly emailClient: ClientProxy
  ) {}

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: require.resolve('@proto/user/user.proto'),
      url: services_config.service_url.user_rpc,
    },
  })
  private userClient: ClientGrpc;
  private userService: UserServiceClient;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'team',
      protoPath: require.resolve('@proto/team/team.proto'),
      url: services_config.service_url.team_rpc,
    },
  })
  private teamClient: ClientGrpc;
  private teamService: TeamServiceClient;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'project',
      protoPath: require.resolve('@proto/project/project.proto'),
      url: services_config.service_url.project_rpc,
    },
  })
  private projectClient: ClientGrpc;
  private projectService: ProjectServiceClient;

  onModuleInit(): void {
    this.userService = this.userClient.getService<UserServiceClient>('UserService');
    this.teamService = this.teamClient.getService<TeamServiceClient>('TeamService');
    this.projectService = this.projectClient.getService<ProjectServiceClient>('ProjectService');
  }

  private readonly jwtSecret = 'secret123';

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const user = await firstValueFrom(this.userService.findOneByEmail(data));
    if (user.user) return this.handleValidationError({res:{msg:"email is already taken"},}, {context:"register"});

    const new_user = await firstValueFrom(this.userService.create(data));
    if (!new_user.res?.ok) return this.handleValidationError({res:{msg:"user creation failed"},}, {context:"register", new_user});
    
    const token = this.generateToken(`${new_user.user?.id}`);
    
    this.emailClient.emit('send_email', {
      to: new_user.user?.email,
      subject: "Verification Email",
      body: `Your verification code is: ${new_user.user?.confirmCode}`,
      from: 'noreply@example.com',
    }).subscribe();

     const createdProject = await firstValueFrom(this.projectService.create({
      name: `My project`,
      description: `This is my first project`,
      owner: new_user.user?.id || '',
    }));
    if (!createdProject.res?.ok) return this.handleValidationError({res:{msg:"project creation failed"},}, {context:"register", createdProject});

    const defaultFlow = {
      name: `My flow`,
      description: `This is my first flow`,
      type: 'FLOW',
      flowData: "{ \"nodes\": [], \"edges\": []}",
    }

      console.log("defaultFlow", defaultFlow);
    const createdFlow = await firstValueFrom(this.projectService.createFlow({
      id: createdProject.id || '',
      flow: defaultFlow
    }));
    if (!createdFlow.res?.ok) return this.handleValidationError({res:{msg:"flow creation failed"},}, {context:"register", createdFlow});

    const createdTeam = await firstValueFrom(this.teamService.create({
      name: `Private`,
      owner: new_user.user?.id || '',
      members: [new_user.user?.id || ''],
      projects: [createdProject.id || ''],
    }));
    if (!createdTeam.res?.ok) return this.handleValidationError({res:{msg:"team creation failed"},}, {context:"register", createdTeam});

    return this.handleSuccessResponse({res:{msg:"register successfull"}, accessToken: token, userId: new_user.user?.id}, {context:"login"});
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const user = await firstValueFrom(this.userService.findOneByEmail(data));

    if (!user.user) return this.handleValidationError({res:{msg:"user not found"},}, {context:"login"});
    if (user.user.password !== data.password) return this.handleValidationError({res:{msg:"wrong password"}}, {context:"login"});

    const token = this.generateToken(user.user?.id);
    return this.handleSuccessResponse({
      res:{msg:"login successfull"},
      accessToken: token,
      userId: user.user?.id
    }, {context:"login"});
  }

  async validate(data: ValidateRequest): Promise<UserPayload> {
    try {
      const payload = jwt.verify(data.token, this.jwtSecret) as UserPayload;
      return { id: payload.id };
    } catch (err) {
      return { id: "" };
    }
  }

  async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    const user = await firstValueFrom(this.userService.findOneById({ id: data.id }));
    if (!user.user) return this.handleValidationError({res:{msg:"user not found"}}, {context:"verifyEmail"});

    if (user.user.confirmCode !== data.verificationCode) return this.handleValidationError({res:{msg:"invalid verification code"}}, {context:"verifyEmail"});
    if (user.user.emailConfirmed) return this.handleValidationError({res:{msg:"email already verified"}}, {context:"verifyEmail"});

    await firstValueFrom(this.userService.update({user: {emailConfirmed: true}, id: data.id}));

    return this.handleSuccessResponse({res:{msg:"email verified successfully"}}, {context:"verifyEmail"});
  }

  async sendVerificationEmail(data: SendVerificationEmailRequest): Promise<SendVerificationEmailResponse> {
    const user = await firstValueFrom(this.userService.findOneById({ id: data.id }));
    if (!user.user) return this.handleValidationError({res:{msg:"user not found"}}, {context:"sendVerificationEmail"});
    if (user.user.emailConfirmed)return this.handleValidationError({res:{msg:"email already verified"}}, {context:"sendVerificationEmail"});

    this.emailClient.emit('send_email', {
      to: user.user.email,
      subject: "Verification Email",
      body: `Your verification code is: ${user.user.confirmCode}`,
      from: 'noreply@example.com',
    }).subscribe();

    return this.handleSuccessResponse({res:{msg:"verification email sent"}}, {context:"sendVerificationEmail"});
  } 
  
  private generateToken(id: string): string {
    const payload: UserPayload = { id };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '2645738d' });
  }

  handleValidationError(response:any, logData:any, logMsg?:string):any {
    const res = {...response, res:{ok:false, status:"ERROR", ...response.res}};
    this.logger.error({response:res, ...logData }, logMsg || response.msg);
    return res;
  }

  handleSuccessResponse(response:any, logData:any, logMsg?:string):any {
    const res = {...response, res:{ok:true, status:"SUCCESS", ...response.res}};
    this.logger.info({response:res, ...logData }, logMsg || response.msg);
    return res;
  }
}
