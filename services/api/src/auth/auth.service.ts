import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { AuthServiceClient } from '@proto/auth/auth.client';
import { LoginRequest, RegisterRequest, SendVerificationEmailRequest, SendVerificationEmailResponse, VerifyEmailRequest } from '@proto/auth/auth';
import { ApiService } from '@api/api/api.service';
import { AuthenticatedRequest } from '@api/types/authenticated-request';

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
    if(!body.email) return this.apiService.handleValidationError({res:{msg:"Field 'email' is required"}}, {context:"auth/login"});
    if(!body.password) return this.apiService.handleValidationError({res:{msg:"Field 'password' is required"}}, {context:"auth/login"});

    return this.grpcService.login(body);
  }

  register(body: RegisterRequest) {
    if(!body.username) return this.apiService.handleValidationError({res:{msg:"Field 'username' is required"}}, {context:"auth/register"});
    if(!body.email) return this.apiService.handleValidationError({res:{msg:"Field 'email' is required"}}, {context:"auth/register"});
    if(!body.password) return this.apiService.handleValidationError({res:{msg:"Field 'password' is required"}}, {context:"auth/register"});

    return this.grpcService.register(body);
  }

  verifyEmail(body: VerifyEmailRequest, req: AuthenticatedRequest) {
    if(!body.verificationCode) return this.apiService.handleValidationError({res:{msg:"Field 'verificationCode' is required"}}, {context:"auth/verifyEmail"});

    return this.grpcService.verifyEmail({...body, id: req.user.id});
  }

  sendVerificationEmail(body: SendVerificationEmailRequest, req: AuthenticatedRequest) {
    return this.grpcService.sendVerificationEmail({id: req.user.id});
  }

  async validate(token: string) {
    return await firstValueFrom(this.grpcService.validate({ token }));
  }
}