import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { services_config } from '@libs/shared/src/services_config';
import { RegisterRequest, LoginRequest, ValidateRequest, AuthResponse, UserPayload } from '@proto/auth/auth';
import { UserServiceClient } from '@proto/user/user.client';

import * as jwt from 'jsonwebtoken';
import { firstValueFrom } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly logger: PinoLogger,
  ) {}

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: require.resolve('@proto/user/user.proto'),
      url: services_config.service_url.user_rpc,
    },
  })
  private client: ClientGrpc;

  private userService: UserServiceClient;

  onModuleInit(): void {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  private readonly jwtSecret = 'secret123';

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const user = await firstValueFrom(this.userService.findOneByEmail(data));

    if (user.user) return this.handleValidationError({res:{msg:"email is already taken"},}, {context:"register"});

    const new_user = await firstValueFrom(this.userService.create(data));
    const token = this.generateToken(new_user.id);

    return this.handleSuccessResponse({res:{msg:"register successfull"}, accessToken: token}, {context:"login"});
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const user = await firstValueFrom(this.userService.findOneByEmail(data));

    if (!user.user) return this.handleValidationError({res:{msg:"user not found"},}, {context:"login"});
    if (user.user.password !== data.password) return this.handleValidationError({res:{msg:"wrong password"}}, {context:"login"});
    

    const token = this.generateToken(user.user?.id);
    return this.handleSuccessResponse({
      res:{msg:"login successfull"},
      accessToken: token
    }, {context:"login"});
  }

  async validate(data: ValidateRequest): Promise<UserPayload> {
    try {
      const payload = jwt.verify(data.token, this.jwtSecret) as UserPayload;
      return { id: payload.id };
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  private generateToken(id: string): string {
    const payload: UserPayload = { id };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '24h' });
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
