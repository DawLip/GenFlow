import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { ProjectServiceClient } from '@proto/project/project.client';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, CreateFlowRequest, CreateFlowResponse, UpdateFlowRequest } from '@proto/project/project';

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
    if(!body.name) return this.apiService.handleValidationError({res:{msg:"Field 'name' is required"}}, {context:"project/create"});
    if(!body.description) return this.apiService.handleValidationError({msg:"Field 'description' is required"}, {context:"project/create"});
    if(!body.team) return this.apiService.handleValidationError({res:{msg:"Field 'team' is required"}}, {context:"project/create"});

    return await firstValueFrom(this.grpcService.create({ ...body, owner: req.user.id }));
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

  async createFlow(body: CreateFlowRequest, req: AuthenticatedRequest) {
    if(!body.flow) return this.apiService.handleValidationError({res:{msg:"Field 'flow' is required"}}, {context:"project/createFlow"});
    if(!body.flow.name) return this.apiService.handleValidationError({res:{msg:"Field 'flow.name' is required"}}, {context:"project/createFlow"});
    if(!body.flow.description) return this.apiService.handleValidationError({res:{msg:"Field 'flow.description' is required"}}, {context:"project/createFlow"});
    if(!body.flow.flowData) return this.apiService.handleValidationError({res:{msg:"Field 'flow.flowData' is required"}}, {context:"project/createFlow"});
    if(!body.flow.type) return this.apiService.handleValidationError({res:{msg:"Field 'flow.type' is required"}}, {context:"project/createFlow"});

    return await firstValueFrom(this.grpcService.createFlow({...body}));
  }

  async updateFlow(body: UpdateFlowRequest, req: AuthenticatedRequest) {
    if(!body.flowName) return this.apiService.handleValidationError({res:{msg:"Field 'flowName' is required"}}, {context:"project/updateFlow"});
    if(!body.field) return this.apiService.handleValidationError({res:{msg:"Field 'field' is required"}}, {context:"project/updateFlow"});
    if(!body.value) return this.apiService.handleValidationError({res:{msg:"Field 'value' is required"}}, {context:"project/updateFlow"});

    return await firstValueFrom(this.grpcService.updateFlow(body));
  }
}
