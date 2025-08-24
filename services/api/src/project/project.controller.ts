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


  @Get(':projectId/flows/*')  
  async flowGet(@Body() body: FindOneByNameFlowRequest, @Req() req: AuthenticatedRequest, @Param('projectId') projectId: string): Promise<FindFlowResponse> {
    const fullPath = req.params.path;
    const flowName = fullPath[fullPath.length-1];
    // @ts-ignore
    const path = `/${fullPath.slice(0, fullPath.length-1).join('/')}/`;
    
    const res = await this.apiProjectService.flowGet(body, req, {projectId, flowName: decodeURIComponent(flowName), path});
    return {...res, flow: res.flow ? {...res.flow, nodes: res.flow?.nodes?.map((node:any) => ({
      ...node,
      position: JSON.parse(node.position),
      style: JSON.parse(node.style),
      data: JSON.parse(node.data)
    }))} : undefined};
  }

  @Post(':projectId/flows')
  flowPost(@Body() body: CreateFlowRequest, @Req() req: AuthenticatedRequest, @Param('projectId') projectId: string): Promise<CreateFlowResponse> {
    return this.apiProjectService.flowPost(body, req, {projectId});
  }

  @Patch(':projectId/flows/:flowName')
  flowPatch(@Body() body: UpdateFlowRequest, @Req() req: AuthenticatedRequest, @Param('projectId') projectId: string, @Param('flowName') flowName: string): Promise<UpdateFlowResponse> {
    return this.apiProjectService.flowPatch(body, req, {projectId, flowName: decodeURIComponent(flowName)});
  }
}
