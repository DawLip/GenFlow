import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { ProjectServiceClient } from '@proto/project/project.client';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, CreateFlowRequest, CreateFlowResponse, UpdateFlowRequest, FindOneByNameFlowRequest } from '@proto/project/project';

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

  async get(body: FindOneByIdRequest, req: AuthenticatedRequest, params:any) {
    if(!params.projectId) return this.apiService.handleValidationError({res:{msg:"Param 'projectId' is required"}}, {context:"project/get"});

    return await firstValueFrom(this.grpcService.findOneById({id: params.projectId}));
  }

  async post(body: CreateRequest, req: AuthenticatedRequest, params:any) {
    if(!body.name) return this.apiService.handleValidationError({res:{msg:"Field 'name' is required"}}, {context:"project/post"});
    if(!body.description) return this.apiService.handleValidationError({msg:"Field 'description' is required"}, {context:"project/post"});

    return await firstValueFrom(this.grpcService.create({ ...body, owner: req.user.id }));
  }

  async patch(body: UpdateRequest, req: AuthenticatedRequest, params:any) {
    if(!body.project) return this.apiService.handleValidationError({res:{msg:"Field 'project' is required"}}, {context:"project/patch"});

    return await firstValueFrom(this.grpcService.update({...body, id: params.projectId}));
  }


  async flowGet(body: FindOneByNameFlowRequest, req: AuthenticatedRequest, params:any) {
    if(!params.projectId) return this.apiService.handleValidationError({res:{msg:"Param 'projectId' is required"}}, {context:"project/get"});

    return await firstValueFrom(this.grpcService.findOneByNameFlow({id: params.projectId, flowName: params.flowName}));
  }

  async flowPost(body: CreateFlowRequest, req: AuthenticatedRequest, params:any) {
    if(!body.flow) return this.apiService.handleValidationError({res:{msg:"Field 'flow' is required"}}, {context:"project/flowPost"});
    if(!body.flow.name) return this.apiService.handleValidationError({res:{msg:"Field 'flow.name' is required"}}, {context:"project/flowPost"});
    if(!body.flow.description) return this.apiService.handleValidationError({res:{msg:"Field 'flow.description' is required"}}, {context:"project/flowPost"});
    if(!body.flow.type) return this.apiService.handleValidationError({res:{msg:"Field 'flow.type' is required"}}, {context:"project/flowPost"});

    return await firstValueFrom(this.grpcService.createFlow({...body, id: params.projectId}));
  }

  async flowPatch(body: UpdateFlowRequest, req: AuthenticatedRequest, params:any) {
    if(!body.flow) return this.apiService.handleValidationError({res:{msg:"Field 'flow' is required"}}, {context:"project/flowPatch"});

    return await firstValueFrom(this.grpcService.updateFlow({...body, id: params.projectId, flowName: params.flowName}));
  }
}
