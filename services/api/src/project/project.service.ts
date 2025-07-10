import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { ProjectServiceClient } from '@proto/project/project.client';
import { CreateRequest, UpdateRequest, FindOneByIdRequest } from '@proto/project/project';

import { ApiService } from '@api/api/api.service';

import { AuthenticatedRequest } from '@api/types/authenticated-request';

@Injectable()
export class ApiProjectService implements OnModuleInit {
  constructor(private readonly apiService: ApiService) {}

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'project',
      protoPath: require.resolve('@proto/project/project.proto'),
      url: services_config.service_url.project_rpc,
    },
  })
  private client: ClientGrpc;

  private grpcService: ProjectServiceClient;

  onModuleInit() {
    this.grpcService = this.client.getService<ProjectServiceClient>('ProjectService');
  }

  async create(body: CreateRequest, req: AuthenticatedRequest) {
    if(!body.description) return this.apiService.handleValidationError({id:"", msg:"gRPC: Field 'description' is required"}, {context:"project/create"});
    if(!body.name) return this.apiService.handleValidationError({id:"", msg:"gRPC: Field 'name' is required"}, {context:"project/create"});
    
    return await firstValueFrom(this.grpcService.create({ ...body, ownerId: req.user.id }));
  }

  async update(body: UpdateRequest) {
    if(!body.field) return this.apiService.handleValidationError({msg:"gRPC: Field 'field' is required"}, {context:"project/update"});
    if(!body.value) return this.apiService.handleValidationError({msg:"gRPC: Field 'value' is required"}, {context:"project/update"});

    return await firstValueFrom(this.grpcService.update(body));
  }

  async findOneById(body: FindOneByIdRequest) {
    if(!body.id) return this.apiService.handleValidationError({msg:"gRPC: Field 'id' is required"}, {context:"project/findOneById"});

    return await firstValueFrom(this.grpcService.findOneById(body));
  }
}
