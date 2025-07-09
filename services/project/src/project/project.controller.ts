import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse
} from '@proto/project/project';
import { ProjectService } from '@project/project/project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @GrpcMethod('ProjectService', 'Create')
  async create(data: CreateRequest): Promise<CreateResponse> {
    console.log("test")
    console.log(data)
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
}
