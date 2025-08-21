import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { AuthServiceClient } from '@proto/auth/auth.client';
import { ApiService } from '@api/api/api.service';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { GenWorkerServiceClient } from '@proto/genworker/genworker.client';
import { EnqueueRequest, FinishPartialTaskRequest, FinishTaskRequest, GenWorkerAssignRequest, GenWorkerDisconnectRequest, GetGenWorkersAssignedToFlowRequest, RegisterRequest } from '@proto/genworker/genworker';

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
    if (!data.workerPools) return this.response.validationFail({res:{msg:"field 'workerPools' is required"}}, {context});
    
    return firstValueFrom(this.grpcService.genWorkerAssign(data));
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
}