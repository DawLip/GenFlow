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
import { TaskService } from './services/task.service';

@Controller()
export class GenWorkerController {
  constructor(
    private readonly genWorkerService: GenWorkerService,
    private readonly taskQueueService:TaskQueueService,
    private readonly taskService:TaskService
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

  @GrpcMethod('GenWorkerService', 'FindOneByProject')
  async findOneByProject(data: FindOneByProjectRequest): Promise<FindResponse> {
    return await this.genWorkerService.findOneByProject(data);
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
  //Project
  @GrpcMethod('GenWorkerService', 'GenWorkerAssignToProject')
  async getGenWorkersAssignToProject(data: GenWorkerAssignToProjectRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.genworkerAssignToProject(data);
  }
  
  @GrpcMethod('GenWorkerService', 'GenWorkerAssignToFlow')
  async genworkerAssignToFlow(data: GenWorkerAssignToFlowRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.genworkerAssignToFlow(data);
  }


  @GrpcMethod('GenWorkerService', 'GetGenWorkersAssignedToFlow')
  async getGenWorkersAssignedToFlow(data: GenWorkerAssignRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.getGenWorkersAssignedToFlow(data);
  }

  @GrpcMethod('GenWorkerService', 'GenWorkerDisconnect')
  async genworkerDisconnect(data: GenWorkerDisconnectRequest): Promise<DefaultResponse> {
    return await this.taskQueueService.genWorkerDisconnect(data);
  }

  @GrpcMethod('GenWorkerService', 'GetTask')
  async getTask(data: GetTaskByIdRequest): Promise<FindTaskResponse> {
    return await this.taskService.findOneById(data);
  }
}
