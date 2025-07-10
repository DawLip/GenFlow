import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { AuthServiceClient } from '@proto/auth/auth.client';
import { LoginRequest, RegisterRequest } from '@proto/auth/auth';
import { ApiService } from '@api/api/api.service';

@Injectable()
export class ApiAuthService implements OnModuleInit {
  constructor(private readonly apiService: ApiService) {}
  
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
    if(!body.email) return this.apiService.handleValidationError({msg:"gRPC: Field 'email' is required"}, {context:"auth/login"});
    if(!body.password) return this.apiService.handleValidationError({msg:"gRPC: Field 'password' is required"}, {context:"auth/login"});

    return this.grpcService.login(body);
  }

  register(body: RegisterRequest) {
    if(!body.username) return this.apiService.handleValidationError({msg:"gRPC: Field 'username' is required"}, {context:"auth/register"});
    if(!body.email) return this.apiService.handleValidationError({msg:"gRPC: Field 'email' is required"}, {context:"auth/register"});
    if(!body.password) return this.apiService.handleValidationError({msg:"gRPC: Field 'password' is required"}, {context:"auth/register"});

    return this.grpcService.register(body);
  }

  async validate(token: string) {
    return await firstValueFrom(this.grpcService.validate({ token }));
  }
}