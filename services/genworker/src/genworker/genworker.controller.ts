import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse,
  DefaultResponse,
  RegisterRequest,
} from '@proto/genworker/genworker';
import { GenWorkerService } from '@genworker/genworker/services/genworker.service';

@Controller()
export class GenWorkerController {
  constructor(private readonly genWorkerService: GenWorkerService) {}

  @GrpcMethod('GenWorkerService', 'Create')
  async create(data: CreateRequest) : Promise<CreateResponse> {
    return await this.genWorkerService.create(data);
  }

  @GrpcMethod('GenWorkerService', 'Update')
  async update(data: UpdateRequest) : Promise<UpdateResponse> {
    return await this.genWorkerService.update(data);
  }

  @GrpcMethod('GenWorkerService', 'FindOneById')
  async findOneById(data: FindOneByIdRequest) : Promise<FindResponse> {
    return await this.genWorkerService.findOneById(data);
  }

  @GrpcMethod('GenWorkerService', 'Register')
  async register(data: RegisterRequest) : Promise<DefaultResponse> {
    return await this.genWorkerService.register(data);
  }
}
