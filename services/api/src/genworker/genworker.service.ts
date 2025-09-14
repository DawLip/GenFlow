import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { AuthServiceClient } from '@proto/auth/auth.client';
import { ApiService } from '@api/api/api.service';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { GenWorkerServiceClient } from '@proto/genworker/genworker.client';
import { EnqueueRequest, FinishPartialTaskRequest, FinishTaskRequest, GetGenWorkersAssignedToFlowRequest, GenWorkerAssignRequest, GenWorkerDisconnectRequest, GenWorkerAssignToFlowRequest, RegisterRequest, GetTaskByIdRequest, GenWorkerAssignToTeamRequest, GenWorkerAssignToProjectRequest, GenWorkerTeamSetMasterRequest, GenWorkerRemoveFromTeamRequest, GenWorkerTeamAddStorageRequest, GenWorkerTeamRemoveStorageRequest } from '@proto/genworker/genworker';

@Injectable()
export class ApiGenWorkerService implements OnModuleInit {
  constructor(
    private readonly apiService: ApiService,
    private readonly response: ResponseService,
  ) {}

  @Client(gRPC_client('genworker'))
  private client: ClientGrpc;
  private grpcService: GenWorkerServiceClient;

  onModuleInit() {
    this.grpcService = this.client.getService<GenWorkerServiceClient>('GenWorkerService');
  }

  enqueueTask(data: EnqueueRequest) {
    const context = 'enqueueTask';

    if (!data.projectId) return this.response.error({res:{msg:"field 'projectId' is required"}}, {context});
    if (!data.flowName) return this.response.error({res:{msg:"field 'flowName' is required"}}, {context});
    if (!data.data) return this.response.error({res:{msg:"field 'data' is required"}}, {context});

    return firstValueFrom(this.grpcService.enqueueTask({...data, data: JSON.stringify(data.data)}));
  }

  finishPartialTask(data: FinishPartialTaskRequest) {
    const context = 'finishPartialTask';

    if (!data.taskId) return this.response.validationFail({res:{msg:"field 'taskId' is required"}}, {context});
    if (!data.workerId) return this.response.validationFail({res:{msg:"field 'workerId' is required"}}, {context});
    if (!data.projectId) return this.response.validationFail({res:{msg:"field 'projectId' is required"}}, {context});
    if (!data.flowName) return this.response.validationFail({res:{msg:"field 'flowName' is required"}}, {context});
    if (!data.status) return this.response.validationFail({res:{msg:"field 'status' is required"}}, {context});

    return firstValueFrom(this.grpcService.finishPartialTask(data));
  }

  finishTask(data: FinishTaskRequest) {
    const context = 'finishTask';

    if (!data.taskId) return this.response.validationFail({res:{msg:"field 'taskId' is required"}}, {context});
    if (!data.workerId) return this.response.validationFail({res:{msg:"field 'workerId' is required"}}, {context});
    if (!data.projectId) return this.response.validationFail({res:{msg:"field 'projectId' is required"}}, {context});
    if (!data.flowName) return this.response.validationFail({res:{msg:"field 'flowName' is required"}}, {context});
    if (!data.status) return this.response.validationFail({res:{msg:"field 'status' is required"}}, {context});

    return firstValueFrom(this.grpcService.finishTask(data));
  }

  register(data: RegisterRequest) {
    const context = 'register';

    console.log(data)

    if (!data.ownerId) return this.response.validationFail({res:{msg:"field 'ownerId' is required"}}, {context});
    if (!data.name) return this.response.validationFail({res:{msg:"field 'name' is required"}}, {context});
    
    return firstValueFrom(this.grpcService.register(data));
  }

  genWorkerAssign(data: GenWorkerAssignRequest) {
    const context = 'genWorkerAssign';

    if (!data.genworkerId) return this.response.validationFail({res:{msg:"field 'genworkerId' is required"}}, {context});
    
    return firstValueFrom(this.grpcService.genWorkerAssign(data));
  }

  getGenworker(data: { id: string }) {
    const context = 'getGenworker';

    if (!data.id) return this.response.validationFail({res:{msg:"field 'id' is required"}}, {context});
    
    return firstValueFrom(this.grpcService.findOneById(data));
  }

  // Team
  genWorkerAssignToTeam(data: GenWorkerAssignToTeamRequest) {
    const context = 'genWorkerAssign';

    if (!data.genworkerId) return this.response.validationFail({res:{msg:"field 'genworkerId' is required"}}, {context});
    if (!data.teamId) return this.response.validationFail({res:{msg:"field 'teamId' is required"}}, {context});

    return firstValueFrom(this.grpcService.genWorkerAssignToTeam(data));
  }
  genWorkerRemoveFromTeam(data: GenWorkerRemoveFromTeamRequest) {
    const context = 'genWorkerRemoveFromTeam';

    if (!data.genworkerId) return this.response.validationFail({res:{msg:"field 'genworkerId' is required"}}, {context});
    if (!data.teamId) return this.response.validationFail({res:{msg:"field 'teamId' is required"}}, {context});

    return firstValueFrom(this.grpcService.genWorkerRemoveFromTeam(data));
  }
  genWorkerTeamSetMaster(data: GenWorkerTeamSetMasterRequest) {
    const context = 'genWorkerTeamSetMaster';

    if (!data.genworkerId) return this.response.validationFail({res:{msg:"field 'genworkerId' is required"}}, {context});
    if (!data.teamId) return this.response.validationFail({res:{msg:"field 'teamId' is required"}}, {context});

    return firstValueFrom(this.grpcService.genWorkerTeamSetMaster(data));
  }

  genWorkerTeamAddStorage(data: GenWorkerTeamAddStorageRequest) {
    const context = 'genWorkerTeamAddStorage';

    if (!data.genworkerId) return this.response.validationFail({res:{msg:"field 'genworkerId' is required"}}, {context});
    if (!data.teamId) return this.response.validationFail({res:{msg:"field 'teamId' is required"}}, {context});

    return firstValueFrom(this.grpcService.genWorkerTeamAddStorage(data));
  }

  genWorkerTeamRemoveStorage(data: GenWorkerTeamRemoveStorageRequest) {
    const context = 'genWorkerTeamRemoveStorage';

    if (!data.genworkerId) return this.response.validationFail({res:{msg:"field 'genworkerId' is required"}}, {context});
    if (!data.teamId) return this.response.validationFail({res:{msg:"field 'teamId' is required"}}, {context});

    return firstValueFrom(this.grpcService.genWorkerTeamRemoveStorage(data));
  }
  //Project
  genWorkerAssignToProject(data: GenWorkerAssignToProjectRequest) {
    const context = 'genWorkerAssign';

    if (!data.genworkerId) return this.response.validationFail({res:{msg:"field 'genworkerId' is required"}}, {context});
    if (!data.projectId) return this.response.validationFail({res:{msg:"field 'projectId' is required"}}, {context});

    return firstValueFrom(this.grpcService.genWorkerAssignToProject(data));
  }
  genWorkerAssignToFlow(data: GenWorkerAssignToFlowRequest) {
    const context = 'genWorkerAssign';

    if (!data.genworkerId) return this.response.validationFail({res:{msg:"field 'genworkerId' is required"}}, {context});
    if (!data.projectId) return this.response.validationFail({res:{msg:"field 'projectId' is required"}}, {context});
    if (!data.flowName) return this.response.validationFail({res:{msg:"field 'flowName' is required"}}, {context});
    if (!data.path) return this.response.validationFail({res:{msg:"field 'path' is required"}}, {context});

    return firstValueFrom(this.grpcService.genWorkerAssignToFlow(data));
  }

  getGenWorkersAssignedToFlow(data: GetGenWorkersAssignedToFlowRequest) {
    const context = 'getGenWorkersAssignedToFlow';

    return firstValueFrom(this.grpcService.getGenWorkersAssignedToFlow(data));
  }

  genWorkerDisconnect(data: GenWorkerDisconnectRequest) {
    const context = 'genWorkerDisconnect';

    if (!data.genworkerId) return this.response.validationFail({res:{msg:"field 'ownerId' is required"}}, {context});
    
    return firstValueFrom(this.grpcService.genWorkerDisconnect(data));
  }

  getTask(data: GetTaskByIdRequest) {
    const context = 'genWorkerDisconnect';

    if (!data.id) return this.response.validationFail({res:{msg:"field 'id' is required"}}, {context});
    
    return firstValueFrom(this.grpcService.getTask(data));
  }
}