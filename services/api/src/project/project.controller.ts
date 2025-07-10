import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest } from '@proto/project/project';
import { ApiProjectService } from './project.service';
import { ApiService } from '@api/api/api.service';

import type { AuthenticatedRequest } from '@api/types/authenticated-request';

@Controller('project')
export class ApiProjectController {
  constructor(private readonly apiProjectService: ApiProjectService) {}

  @Post('create')
  create(@Body() body: CreateRequest, @Req() req: AuthenticatedRequest) {
    return this.apiProjectService.create(body, req);
  }

  @Post('update')
  update(@Body() body: UpdateRequest) {
    return this.apiProjectService.update(body);
  }

  @Post('findOneById')
  findOneById(@Body() body: FindOneByIdRequest) {
    return this.apiProjectService.findOneById(body);
  }
}