import { Controller, Post, Body, Req, Param, Get, Patch } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, JoinRequest, LeaveResponse, UpdateResponse, CreateResponse, FindResponse, JoinResponse, LeaveRequest } from '@proto/team/team';
import { ApiTeamService } from './team.service';

import type { AuthenticatedRequest } from '@api/types/authenticated-request';

@Controller('teams')
export class ApiTeamController {
  constructor(private readonly teamService: ApiTeamService) {}

  @Get(':teamId')
  get(@Body() body: UpdateRequest, @Req() req: AuthenticatedRequest, @Param('teamId') teamId: string): Promise<UpdateResponse> {
    return this.teamService.get(body, req, {teamId});
  }

  @Post()
  post(@Body() body: CreateRequest, @Req() req: AuthenticatedRequest): Promise<CreateResponse> {
    return this.teamService.post(body, req, {});
  }

  @Patch(':teamId')
  patch(@Body() body: UpdateRequest, @Req() req: AuthenticatedRequest, @Param('teamId') teamId: string): Promise<UpdateResponse> {
    return this.teamService.patch(body, req, {teamId});
  }


  @Post(':teamId/join')
  join(@Body() body: JoinRequest, @Req() req: AuthenticatedRequest, @Param('teamId') teamId: string): Promise<JoinResponse> {
    return this.teamService.join(body, req, {teamId});
  }

  @Post(':teamId/leave')
  leave(@Body() body: LeaveRequest, @Req() req: AuthenticatedRequest, @Param('teamId') teamId: string): Promise<LeaveResponse> {
    return this.teamService.leave(body, req, {teamId});
  }
}