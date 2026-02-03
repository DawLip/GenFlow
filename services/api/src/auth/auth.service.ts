import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { AuthServiceClient } from '@proto/auth/auth.client';
import { LoginRequest, RegisterRequest, SendVerificationEmailRequest, SendVerificationEmailResponse, VerifyEmailRequest } from '@proto/auth/auth';
import { ApiService } from '@api/api/api.service';
import { AuthenticatedRequest } from '@api/types/authenticated-request';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Injectable()
export class ApiAuthService implements OnModuleInit {
  constructor(
    private readonly apiService: ApiService,
    private readonly response: ResponseService,
  ) {}

  @Client(gRPC_client('auth'))
  private client: ClientGrpc;

  private grpcService: AuthServiceClient;

  onModuleInit() {
    this.grpcService = this.client.getService<AuthServiceClient>('AuthService');
  }

  login(body: LoginRequest) {
    if(!body.email) return this.response.validationFail({res:{msg:"Field 'email' is required"}}, {context:"auth/login"});
    if(!body.password) return this.response.validationFail({res:{msg:"Field 'password' is required"}}, {context:"auth/login"});

    return this.grpcService.login(body);
  }

  register(body: RegisterRequest) {
    if(!body.username) return this.response.validationFail({res:{msg:"Field 'username' is required"}}, {context:"auth/register"});
    if(!body.email) return this.response.validationFail({res:{msg:"Field 'email' is required"}}, {context:"auth/register"});
    if(!body.password) return this.response.validationFail({res:{msg:"Field 'password' is required"}}, {context:"auth/register"});

    return this.grpcService.register(body);
  }

  verifyEmail(body: VerifyEmailRequest, req: AuthenticatedRequest) {
    if(!body.verificationCode) return this.response.validationFail({res:{msg:"Field 'verificationCode' is required"}}, {context:"auth/verifyEmail"});

    return this.grpcService.verifyEmail({...body, id: req.user.id});
  }

  sendVerificationEmail(body: SendVerificationEmailRequest, req: AuthenticatedRequest) {
    return this.grpcService.sendVerificationEmail({id: req.user.id});
  }

  async validate(token: string) {
    return await firstValueFrom(this.grpcService.validate({ token }));
  }
}