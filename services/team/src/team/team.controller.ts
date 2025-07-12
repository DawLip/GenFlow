import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse,
  JoinRequest,
  JoinResponse,
  LeaveRequest,
  LeaveResponse
} from '@proto/team/team';
import { TeamService } from '@team/team/team.service';

@Controller()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @GrpcMethod('TeamService', 'Create')
  async create(data: CreateRequest): Promise<CreateResponse> {
    return await this.teamService.create(data);
  }

  @GrpcMethod('TeamService', 'Update')
  async update(data: UpdateRequest): Promise<UpdateResponse> {
    return await this.teamService.update(data);
  }

  @GrpcMethod('TeamService', 'FindOneById')
  async findOneById(data: FindOneByIdRequest): Promise<FindResponse> {
    return await this.teamService.findOneById(data);
  }
  @GrpcMethod('TeamService', 'Join')
  async join(data: JoinRequest): Promise<JoinResponse> {
    return await this.teamService.join(data);
  }

  @GrpcMethod('TeamService', 'Leave')
  async leave(data: LeaveRequest): Promise<LeaveResponse> {
    return await this.teamService.leave(data);
  }
}
