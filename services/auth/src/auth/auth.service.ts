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
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';


@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly logger: PinoLogger,
    private readonly response: ResponseService,
    @Inject('EMAIL_CLIENT') private readonly emailClient: ClientProxy
  ) {}

  @Client(gRPC_client('user'))
  private userClient: ClientGrpc;
  private userService: UserServiceClient;

  @Client(gRPC_client('team'))
  private teamClient: ClientGrpc;
  private teamService: TeamServiceClient;

  onModuleInit(): void {
    this.userService = this.userClient.getService<UserServiceClient>('UserService');
    this.teamService = this.teamClient.getService<TeamServiceClient>('TeamService');
  }

  private readonly jwtSecret = 'secret123';

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const user = await firstValueFrom(this.userService.findOneByEmail(data));
    if (user.user) return this.response.fail({res:{msg:"email is already taken"},}, {context:"register"});

    const new_user = await firstValueFrom(this.userService.create(data));
    if (!new_user.res?.ok) return this.response.error({res:{msg:"user creation failed"},}, {context:"register", new_user});

    const token = this.generateToken(`${new_user.user?.id}`);
    
    this.emailClient.emit('send_email', {
      to: new_user.user?.email,
      subject: "Verification Email",
      body: `Your verification code is: ${new_user.user?.confirmCode}`,
      from: 'noreply@example.com',
    }).subscribe();

    const defaultFlow = {
      name: `My flow`,
      path: '/',
      description: `This is my first flow`,
      type: 'FLOW',
      nodes: [],
      edges: [],
      genworkers: []
    }
    
    const createdTeam = await firstValueFrom(this.teamService.create({
      name: `Private`,
      owner: new_user.user?.id || '',
      members: [new_user.user?.id || ''],
      projects: []
    }));
    if (!createdTeam.res?.ok) return this.response.error({res:{msg:"team creation failed"},}, {context:"register", createdTeam});

    return this.response.success({res:{msg:"register successfull"}, accessToken: token, userId: new_user.user?.id}, {context:"register"});
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const user = await firstValueFrom(this.userService.findOneByEmail(data));

    if (!user.user) return this.response.fail({res:{msg:"user not found"},}, {context:"login"});
    if (user.user.password !== data.password) return this.response.fail({res:{msg:"wrong password"}}, {context:"login"});

    const token = this.generateToken(user.user?.id);
    return this.response.success({
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
    if (!user.user) return this.response.fail({res:{msg:"user not found"}}, {context:"verifyEmail"});

    if (user.user.confirmCode !== data.verificationCode) return this.response.fail({res:{msg:"invalid verification code"}}, {context:"verifyEmail"});
    if (user.user.emailConfirmed) return this.response.fail({res:{msg:"email already verified"}}, {context:"verifyEmail"});

    await firstValueFrom(this.userService.update({user: {emailConfirmed: true}, id: data.id}));

    return this.response.success({res:{msg:"email verified successfully"}}, {context:"verifyEmail"});
  }

  async sendVerificationEmail(data: SendVerificationEmailRequest): Promise<SendVerificationEmailResponse> {
    const user = await firstValueFrom(this.userService.findOneById({ id: data.id }));
    if (!user.user) return this.response.fail({res:{msg:"user not found"}}, {context:"sendVerificationEmail"});
    if (user.user.emailConfirmed) return this.response.fail({res:{msg:"email already verified"}}, {context:"sendVerificationEmail"});

    this.emailClient.emit('send_email', {
      to: user.user.email,
      subject: "Verification Email",
      body: `Your verification code is: ${user.user.confirmCode}`,
      from: 'noreply@example.com',
    }).subscribe();

    return this.response.success({res:{msg:"verification email sent"}}, {context:"sendVerificationEmail"});
  } 
  
  private generateToken(id: string): string {
    const payload: UserPayload = { id };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '2645738d' });
  }
}
