import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { UserServiceClient } from '@proto/user/user.client';
import { CreateRequest, UpdateRequest, FindOneByIdRequest } from '@proto/user/user';

import { ApiService } from '@api/api/api.service';

import { AuthenticatedRequest } from '@api/types/authenticated-request';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Injectable()
export class ApiUserService implements OnModuleInit {
  constructor(
    private readonly apiService: ApiService,
    private readonly response: ResponseService
  ) {}

  @Client(gRPC_client('user'))
  private client: ClientGrpc;
  private grpcService: UserServiceClient;

  onModuleInit() {
    this.grpcService = this.client.getService<UserServiceClient>('UserService');
  }

  async get(body: FindOneByIdRequest, req: AuthenticatedRequest, params) {
    if(!params.userId) return this.response.validationFail({res:{msg:"Param 'userId' is required"}}, {context:"user/patch"});
    
    const user = await firstValueFrom(this.grpcService.findOneById({
      id: params.userId, 
      populateTeams: params.populateTeams || false
    }));
    if (user.user) user.user.password = '<hidden>';
    if (user.user) user.user.confirmCode = '<hidden>';

    return user;
  }

  async patch(body: UpdateRequest, req: AuthenticatedRequest, params) {
    if(!body.user) return this.response.validationFail({res:{msg:"Field 'user' is required"}}, {context:"user/patch"});
    if(!params.userId) return this.response.validationFail({res:{msg:"Param 'userId' is required"}}, {context:"user/patch"});

    return await firstValueFrom(this.grpcService.update(body));
  }
}
