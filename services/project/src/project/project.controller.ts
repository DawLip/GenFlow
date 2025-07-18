import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest, CreateResponse, 
  UpdateRequest, UpdateResponse, 
  FindOneByIdRequest, FindResponse,
  CreateFlowRequest, CreateFlowResponse,
  UpdateFlowRequest, UpdateFlowResponse,
  FindOneByNameFlowRequest, FindFlowResponse
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
}
