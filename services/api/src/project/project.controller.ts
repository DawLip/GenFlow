import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, CreateFlowRequest, CreateResponse, UpdateResponse, CreateFlowResponse, UpdateFlowRequest, UpdateFlowResponse } from '@proto/project/project';
import { ApiProjectService } from './project.service';
import { ApiService } from '@api/api/api.service';

import type { AuthenticatedRequest } from '@api/types/authenticated-request';

@Controller('project')
export class ApiProjectController {
  constructor(private readonly apiProjectService: ApiProjectService) {}

  @Post('create')
  create(@Body() body: CreateRequest, @Req() req: AuthenticatedRequest): Promise<CreateResponse> {
    return this.apiProjectService.create(body, req);
  }

  @Post('update')
  update(@Body() body: UpdateRequest, @Req() req: AuthenticatedRequest): Promise<UpdateResponse> {
    return this.apiProjectService.update(body, req);
  }

  @Post('findOneById')
  findOneById(@Body() body: FindOneByIdRequest, @Req() req: AuthenticatedRequest): Promise<FindOneByIdRequest> {
    return this.apiProjectService.findOneById(body, req);
  }

  @Post('createFlow')
  createFlow(@Body() body: CreateFlowRequest, @Req() req: AuthenticatedRequest): Promise<CreateFlowResponse> {
    return this.apiProjectService.createFlow(body, req);
  }

  @Post('updateFlow')
  updateFlow(@Body() body: UpdateFlowRequest, @Req() req: AuthenticatedRequest): Promise<UpdateFlowResponse> {
    return this.apiProjectService.updateFlow(body, req);
  }
}