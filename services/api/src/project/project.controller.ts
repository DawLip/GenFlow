import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest } from '@proto/project/project';
import { ProjectService } from './project.service';

import type { AuthenticatedRequest } from '@api/types/authenticated-request';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  create(@Body() body: CreateRequest, @Req() req: AuthenticatedRequest) {
    return this.projectService.create(body, req);
  }

  @Post('update')
  update(@Body() body: UpdateRequest) {
    return this.projectService.update(body);
  }

  @Post('findOneById')
  findOneById(@Body() body: FindOneByIdRequest) {
    return this.projectService.findOneById(body);
  }
}