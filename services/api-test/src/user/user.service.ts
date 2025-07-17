import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { UserServiceClient } from '@proto/user/user.client';
import { CreateRequest, UpdateRequest, FindOneByIdRequest } from '@proto/user/user';

import { ApiService } from '@api-test/api/api.service';

import { AuthenticatedRequest } from '@api-test/types/authenticated-request';

@Injectable()
export class ApiUserService implements OnModuleInit {
  constructor(private readonly apiService: ApiService) {}

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: require.resolve('@proto/user/user.proto'),
      url: services_config.service_url.user_rpc,
    },
  })
  private client: ClientGrpc;

  private grpcService: UserServiceClient;

  onModuleInit() {
    this.grpcService = this.client.getService<UserServiceClient>('UserService');
  }

  async create(body: CreateRequest, req: AuthenticatedRequest) {
    if(!body.email) return this.apiService.handleValidationError({res:{msg:"Field 'email' is required"}}, {context:"project/create"});
    if(!body.username) return this.apiService.handleValidationError({msg:"Field 'username' is required"}, {context:"project/create"});
    if(!body.password) return this.apiService.handleValidationError({res:{msg:"Field 'password' is required"}}, {context:"project/create"});

    return await firstValueFrom(this.grpcService.create({ ...body }));
  }

  async update(body: UpdateRequest, req: AuthenticatedRequest) {
    if(!body.field) return this.apiService.handleValidationError({res:{msg:"Field 'field' is required"}}, {context:"project/update"});
    if(!body.value) return this.apiService.handleValidationError({res:{msg:"Field 'value' is required"}}, {context:"project/update"});

    return await firstValueFrom(this.grpcService.update(body));
  }

  async findOneById(body: FindOneByIdRequest, req: AuthenticatedRequest) {
    if(!body.id) return this.apiService.handleValidationError({res:{msg:"Field 'id' is required"}}, {context:"project/findOneById"});

    return await firstValueFrom(this.grpcService.findOneById(body));
  }
}
