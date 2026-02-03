import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByEmailRequest, FindOneByIdRequest, FindResponse,
  RegisterGenWorkerRequest,
  RegisterGenWorkerResponse
} from '@proto/user/user';
import { UserService } from '@user/user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'Create')
  async create(data: CreateRequest) : Promise<CreateResponse> {
    return await this.userService.create(data);
  }

  @GrpcMethod('UserService', 'Update')
  async update(data: UpdateRequest) : Promise<UpdateResponse> {
    return await this.userService.update(data);
  }

  @GrpcMethod('UserService', 'FindOneById')
  async findOneById(data: FindOneByIdRequest) : Promise<FindResponse> {
    return await this.userService.findOneById(data);
  }

  @GrpcMethod('UserService', 'FindOneByEmail')
  async findOneByEmail(data: FindOneByEmailRequest) : Promise<FindResponse> {
    return await this.userService.findOneByEmail(data);
  }

  @GrpcMethod('UserService', 'RegisterGenWorker')
  async registerGenWorker(data: RegisterGenWorkerRequest) : Promise<RegisterGenWorkerResponse> {
    return await this.userService.registerGenWorker(data);
  }
}
