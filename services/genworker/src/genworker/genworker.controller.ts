import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse, DefaultResponse, RegisterRequest, EnqueueRequest, FinishPartialTaskRequest, FinishTaskRequest, GenWorkerAssignRequest, GenWorkerDisconnectRequest,
  GenWorkerAssignToFlowRequest,
} from '@proto/genworker/genworker';
import { GenWorkerService } from '@genworker/genworker/services/genworker.service';
import { TaskQueueService } from './services/task_queue.service';

@Controller()
export class GenWorkerController {
  constructor(
    private readonly genWorkerService: GenWorkerService,
    private readonly taskQueueService:TaskQueueService
  ) {}

  @GrpcMethod('GenWorkerService', 'Create')
  async create(data: CreateRequest): Promise<CreateResponse> {
    return await this.genWorkerService.create(data);
  }

  @GrpcMethod('GenWorkerService', 'Update')
  async update(data: UpdateRequest): Promise<UpdateResponse> {
    return await this.genWorkerService.update(data);
  }

  @GrpcMethod('GenWorkerService', 'FindOneById')
  async findOneById(data: FindOneByIdRequest): Promise<FindResponse> {
    return await this.genWorkerService.findOneById(data);
  }


  @GrpcMethod('GenWorkerService', 'EnqueueTask')
  async enqueueTask(data: EnqueueRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.enqueueTask(data);
  }

  @GrpcMethod('GenWorkerService', 'FinishPartialTask')
  async finishPartialTask(data: FinishPartialTaskRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.finishPartialTask(data);
  }

  @GrpcMethod('GenWorkerService', 'FinishTask')
  async finishTask(data: FinishTaskRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.finishTask(data);
  }

  @GrpcMethod('GenWorkerService', 'Register')
  async register(data: RegisterRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.register(data);
  }

  @GrpcMethod('GenWorkerService', 'GenWorkerAssign')
  async genworkerAssign(data: GenWorkerAssignRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.genWorkerAssign(data);
  }

  @GrpcMethod('GenWorkerService', 'GenWorkerAssignToFlow')
  async genworkerAssignToFlow(data: GenWorkerAssignToFlowRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.genWorkerAssignToFlow(data);
  }

  @GrpcMethod('GenWorkerService', 'GetGenWorkersAssignedToFlow')
  async getGenWorkersAssignedToFlow(data: GenWorkerAssignRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.getGenWorkersAssignedToFlow(data);
  }

  @GrpcMethod('GenWorkerService', 'GenWorkerDisconnect')
  async genworkerDisconnect(data: GenWorkerDisconnectRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.genWorkerDisconnect(data);
  }
}
