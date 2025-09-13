import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest, CreateResponse, 
  UpdateRequest, UpdateResponse, 
  FindOneByIdRequest, FindResponse,
  CreateFlowRequest, CreateFlowResponse,
  UpdateFlowRequest, UpdateFlowResponse,
  FindOneByNameFlowRequest, FindFlowResponse,
  FindByTeamIdRequest, FindByTeamIdResponse,
  UpdateFlowDataResponse,
  UpdateFlowDataRequest,
  DefaultResponse,
  AssignGenworkerToFlowRequest,
  AssignGenworkerToProjectRequest
} from '@proto/project/project';
import { ProjectService } from '@project/project/project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @GrpcMethod('ProjectService', 'Create')
  async create(data: CreateRequest): Promise<CreateResponse> {
    return await this.projectService.create(data);
  }

  @GrpcMethod('ProjectService', 'Update')
  async update(data: UpdateRequest): Promise<UpdateResponse> {
    return await this.projectService.update(data);
  }

  @GrpcMethod('ProjectService', 'FindOneById')
  async findOneById(data: FindOneByIdRequest): Promise<FindResponse> {
    return await this.projectService.findOneById(data);
  }

  @GrpcMethod('ProjectService', 'FindByTeamId')
  async findByTeamId(data: FindByTeamIdRequest): Promise<FindByTeamIdResponse> {
    return await this.projectService.findByTeamId(data);
  }

  @GrpcMethod('ProjectService', 'FindOneByNameFlow')
  async findOneByNameFlow(data: FindOneByNameFlowRequest): Promise<FindFlowResponse> {
    return await this.projectService.findOneByNameFlow(data);
  }

  @GrpcMethod('ProjectService', 'CreateFlow')
  async createFlow(data: CreateFlowRequest): Promise<CreateFlowResponse> {
    return await this.projectService.createFlow(data);
  }

  @GrpcMethod('ProjectService', 'UpdateFlow')
  async updateFlow(data: UpdateFlowRequest): Promise<UpdateFlowResponse> {
    return await this.projectService.updateFlow(data);
  }

  @GrpcMethod('ProjectService', 'UpdateFlowData')
  async updateFlowData(data: UpdateFlowDataRequest): Promise<UpdateFlowDataResponse> {
    return await this.projectService.updateFlowData({...data, data: JSON.parse(data.data)});
  }

  @GrpcMethod('ProjectService', 'AssignGenworkerToFlow')
  async assignGenworkerToFlow(data: AssignGenworkerToFlowRequest): Promise<DefaultResponse> {
    return await this.projectService.assignGenworkerToFlow(data);
  }

  @GrpcMethod('ProjectService', 'AssignGenworkerToProject')
  async assignGenworkerToProject(data: AssignGenworkerToProjectRequest): Promise<DefaultResponse> {
    return await this.projectService.assignGenworkerToProject(data);
  }
}
