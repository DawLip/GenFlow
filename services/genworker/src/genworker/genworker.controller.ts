import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse, DefaultResponse, RegisterRequest, EnqueueRequest, FinishPartialTaskRequest, FinishTaskRequest, GenWorkerAssignRequest, GenWorkerDisconnectRequest,
  GenWorkerAssignToFlowRequest,
  GetTaskByIdRequest,
  FindTaskResponse,
  FindOneByProjectRequest,
  GenWorkerAssignToTeamRequest,
  GenWorkerAssignToProjectRequest,
  GenWorkerTeamRemoveStorageRequest,
  GenWorkerTeamAddStorageRequest,
  GenWorkerTeamSetMasterRequest,
  GenWorkerRemoveFromTeamRequest,
} from '@proto/genworker/genworker';
import { GenWorkerService } from '@genworker/genworker/services/genworker.service';
import { TaskQueueService } from './services/task_queue.service';

@Controller()
export class GenWorkerController {
  constructor(
    private readonly genWorkerService: GenWorkerService,
    private readonly taskQueueService:TaskQueueService,
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

  @GrpcMethod('GenWorkerService', 'Register')
  async register(data: RegisterRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.register(data);
  }

  @GrpcMethod('GenWorkerService', 'GenWorkerAssign')
  async genworkerAssign(data: GenWorkerAssignRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.genWorkerAssign(data);
  }

  
  // Team
  @GrpcMethod('GenWorkerService', 'GenWorkerAssignToTeam')
  async getGenWorkerAssignToTeam(data: GenWorkerAssignToTeamRequest): Promise<DefaultResponse> {
    return await this.genWorkerService.assignToTeam(data);
  }
  @GrpcMethod('GenWorkerService', 'GenWorkerRemoveFromTeam')
  async getGenWorkerRemoveFromTeam(data: GenWorkerRemoveFromTeamRequest): Promise<DefaultResponse> {
    return await this.genWorkerService.removeFromTeam(data);
  }
  @GrpcMethod('GenWorkerService', 'GenWorkerTeamSetMaster')
  async getGenWorkerTeamSetMaster(data: GenWorkerTeamSetMasterRequest): Promise<DefaultResponse> {
    return await this.genWorkerService.teamSetMaster(data);
  }
  @GrpcMethod('GenWorkerService', 'GenWorkerTeamAddStorage')
  async getGenWorkerTeamAddStorage(data: GenWorkerTeamAddStorageRequest): Promise<DefaultResponse> {
    return await this.genWorkerService.teamAddStorage(data);
  }
  @GrpcMethod('GenWorkerService', 'GenWorkerTeamRemoveStorage')
  async getGenWorkerTeamRemoveStorage(data: GenWorkerTeamRemoveStorageRequest): Promise<DefaultResponse> {
    return await this.genWorkerService.teamRemoveStorage(data);
  }
}
