import { Controller, Post, Body, Req, Patch, Get, Param } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, CreateFlowRequest, CreateResponse, UpdateResponse, CreateFlowResponse, UpdateFlowRequest, UpdateFlowResponse, FindOneByNameFlowRequest, FindFlowResponse } from '@proto/project/project';
import { ApiProjectService } from './project.service';

import type { AuthenticatedRequest } from '@api/types/authenticated-request';

@Controller('projects')
export class ApiProjectController {
  constructor(private readonly apiProjectService: ApiProjectService) {}

  @Get(':projectId')
  get(@Body() body: FindOneByIdRequest, @Req() req: AuthenticatedRequest, @Param('projectId') projectId: string): Promise<FindOneByIdRequest> {
    return this.apiProjectService.get(body, req, {projectId});
  }
  
  @Post()
  post(@Body() body: CreateRequest, @Req() req: AuthenticatedRequest): Promise<CreateResponse> {
    return this.apiProjectService.post(body, req, {});
  }

  @Patch(':projectId')
  patch(@Body() body: UpdateRequest, @Req() req: AuthenticatedRequest, @Param('projectId') projectId: string): Promise<UpdateResponse> {
    return this.apiProjectService.patch(body, req, {projectId});
  }


  @Get(':projectId/flows/:flowName')
  flowGet(@Body() body: FindOneByNameFlowRequest, @Req() req: AuthenticatedRequest, @Param('projectId') projectId: string, @Param('flowName') flowName: string): Promise<FindFlowResponse> {
    return this.apiProjectService.flowGet(body, req, {projectId, flowName});
  }

  @Post(':projectId/flows')
  flowPost(@Body() body: CreateFlowRequest, @Req() req: AuthenticatedRequest, @Param('projectId') projectId: string): Promise<CreateFlowResponse> {
    return this.apiProjectService.flowPost(body, req, {projectId});
  }

  @Patch(':projectId/flows/:flowName')
  flowPatch(@Body() body: UpdateFlowRequest, @Req() req: AuthenticatedRequest, @Param('projectId') projectId: string, @Param('flowName') flowName: string): Promise<UpdateFlowResponse> {
    return this.apiProjectService.flowPatch(body, req, {projectId, flowName});
  }
}
