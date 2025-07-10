import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { AuthServiceClient } from '@proto/auth/auth.client';
import { LoginRequest, RegisterRequest } from '@proto/auth/auth';

@Injectable()
export class AuthService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: require.resolve('@proto/auth/auth.proto'),
      url: services_config.service_url.auth_rpc,
    },
  })
  private client: ClientGrpc;

  private grpcService: AuthServiceClient;

  onModuleInit() {
    this.grpcService = this.client.getService<AuthServiceClient>('AuthService');
  }

  login(body: LoginRequest) {
    return this.grpcService.login(body);
  }

  register(body: RegisterRequest) {
    return this.grpcService.register(body);
  }

  async validate(token: string) {
    return await firstValueFrom(this.grpcService.validate({ token }));
  }
}