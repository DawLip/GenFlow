import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { ProjectServiceClient } from '@proto/project/project.client';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, CreateFlowRequest, CreateFlowResponse, UpdateFlowRequest, FindOneByNameFlowRequest } from '@proto/project/project';

import { ApiService } from '@api/api/api.service';

import { AuthenticatedRequest } from '@api/types/authenticated-request';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Injectable()
export class ApiProjectService implements OnModuleInit {
  constructor(
    private readonly apiService: ApiService,
    private readonly response: ResponseService
  ) {}

  @Client(gRPC_client('project'))
  private client: ClientGrpc;

  private grpcService: ProjectServiceClient;

  onModuleInit() {
    this.grpcService = this.client.getService<ProjectServiceClient>('ProjectService');
  }

  async get(body: FindOneByIdRequest, req: AuthenticatedRequest, params:any) {
    if(!params.projectId) return this.response.validationFail({res:{msg:"Param 'projectId' is required"}}, {context:"project/get"});

    return await firstValueFrom(this.grpcService.findOneById({id: params.projectId}));
  }

  async post(body: CreateRequest, req: AuthenticatedRequest, params:any) {
    if(!body.name) return this.response.validationFail({res:{msg:"Field 'name' is required"}}, {context:"project/post"});
    if(!body.description) return this.response.validationFail({msg:"Field 'description' is required"}, {context:"project/post"});

    return await firstValueFrom(this.grpcService.create({ ...body, owner: req.user.id }));
  }

  async patch(body: UpdateRequest, req: AuthenticatedRequest, params:any) {
    if(!body.project) return this.response.validationFail({res:{msg:"Field 'project' is required"}}, {context:"project/patch"});

    return await firstValueFrom(this.grpcService.update({...body, id: params.projectId}));
  }


  async flowGet(body: FindOneByNameFlowRequest, req: AuthenticatedRequest, params:any) {
    if(!params.projectId) return this.response.validationFail({res:{msg:"Param 'projectId' is required"}}, {context:"project/get"});

    return await firstValueFrom(this.grpcService.findOneByNameFlow({id: params.projectId, flowName: params.flowName, path: params.path}));
  }

  async flowPost(body: CreateFlowRequest, req: AuthenticatedRequest, params:any) {
    if(!body.flow) return this.response.validationFail({res:{msg:"Field 'flow' is required"}}, {context:"project/flowPost"});
    if(!body.flow.name) return this.response.validationFail({res:{msg:"Field 'flow.name' is required"}}, {context:"project/flowPost"});
    if(!body.flow.description) return this.response.validationFail({res:{msg:"Field 'flow.description' is required"}}, {context:"project/flowPost"});
    if(!body.flow.type) return this.response.validationFail({res:{msg:"Field 'flow.type' is required"}}, {context:"project/flowPost"});

    return await firstValueFrom(this.grpcService.createFlow({...body, id: params.projectId}));
  }

  async flowPatch(body: UpdateFlowRequest, req: AuthenticatedRequest, params:any) {
    if(!body.flow) return this.response.validationFail({res:{msg:"Field 'flow' is required"}}, {context:"project/flowPatch"});

    return await firstValueFrom(this.grpcService.updateFlow({...body, id: params.projectId, flowName: params.flowName}));
  }
}
