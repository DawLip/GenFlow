import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByEmailRequest, FindOneByIdRequest, FindResponse
} from '@proto/lib/user/user';
import { ProjectService } from '@project/project/project.service';

@Controller()
export class UserController {
  constructor(private readonly projectService: ProjectService) {}

  @GrpcMethod('UserService', 'Create')
  async create(data: CreateRequest) : Promise<CreateResponse> {
    return await this.projectService.create(data);
  }

  @GrpcMethod('UserService', 'Update')
  async update(data: UpdateRequest) : Promise<UpdateResponse> {
    return await this.projectService.update(data);
  }

  @GrpcMethod('UserService', 'FindOneById')
  async findOneById(data: FindOneByIdRequest) : Promise<FindResponse> {
    return await this.projectService.findOneById(data);
  }
}
