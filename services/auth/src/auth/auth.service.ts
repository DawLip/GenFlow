import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { services_config } from '@libs/shared/src/lib/services_config';
import { RegisterRequest, LoginRequest, ValidateRequest, AuthResponse, UserPayload } from '@proto/lib/auth';
import { UserServiceClient } from '@proto/lib/user.client';

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
      protoPath: require.resolve('@proto/lib/user.proto'),
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

    if(!data.email || !data.password || !data.username){
      this.logger.warn({context:"register", f_args: data}, "All fields are required")
      return { accessToken:"", status: "ERROR", msg: "all fields are required" }
    }

    if(user.user){
      this.logger.warn({context:"register", f_args: data}, "Email is already taken")
      return { accessToken:"", status: "ERROR", msg: "email is already taken" }
    }

    const new_user = await firstValueFrom(this.userService.create(data));
    const token = this.generateToken(new_user.id);

    this.logger.info({context:"register"}, "Register successful");
    return { accessToken: token, status: "SUCCESS", msg: "register successful" };
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const user = await firstValueFrom(this.userService.findOneByEmail(data));

    if(!user.user){
      this.logger.warn({context:"login", f_args: data}, "User not found");
      return { accessToken:"", status: "ERROR", msg: "user not found" }
    }

    if(user.user.password !== data.password){
      this.logger.warn({context:"login", f_args: data}, "Wrong password");
      return { accessToken:"", status: "ERROR", msg: "wrong password" }
    }

    this.logger.info({context:"login"}, "Login successful");
    const token = this.generateToken(user.user?.id);
    return { accessToken: token, status: "SUCCESS", msg: "login successful" };
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
}
