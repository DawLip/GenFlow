import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest } from '@proto/team/team';
import { ApiTeamService } from './team.service';

import type { AuthenticatedRequest } from '@api/types/authenticated-request';

@Controller('team')
export class ApiTeamController {
  constructor(private readonly teamService: ApiTeamService) {}

  @Post('create')
  create(@Body() body: CreateRequest, @Req() req: AuthenticatedRequest) {
    return this.teamService.create(body, req);
  }

  @Post('update')
  update(@Body() body: UpdateRequest) {
    return this.teamService.update(body);
  }

  @Post('findOneById')
  findOneById(@Body() body: FindOneByIdRequest) {
    return this.teamService.findOneById(body);
  }
}