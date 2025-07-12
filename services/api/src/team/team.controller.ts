import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, JoinRequest, LeaveResponse, UpdateResponse, CreateResponse, FindResponse, JoinResponse, LeaveRequest } from '@proto/team/team';
import { ApiTeamService } from './team.service';

import type { AuthenticatedRequest } from '@api/types/authenticated-request';

@Controller('team')
export class ApiTeamController {
  constructor(private readonly teamService: ApiTeamService) {}

  @Post('create')
  create(@Body() body: CreateRequest, @Req() req: AuthenticatedRequest): Promise<CreateResponse> {
    return this.teamService.create(body, req);
  }

  @Post('update')
  update(@Body() body: UpdateRequest): Promise<UpdateResponse> {
    return this.teamService.update(body);
  }

  @Post('findOneById')
  findOneById(@Body() body: FindOneByIdRequest):Promise<FindResponse> {
    return this.teamService.findOneById(body);
  }

  @Post('join')
  join(@Body() body: JoinRequest, @Req() req: AuthenticatedRequest): Promise<JoinResponse> {
    return this.teamService.join(body, req);
  }

  @Post('leave')
  leave(@Body() body: LeaveRequest, @Req() req: AuthenticatedRequest): Promise<LeaveResponse> {
    return this.teamService.leave(body, req);
  }
}