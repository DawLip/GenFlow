import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, JoinRequest, LeaveResponse, UpdateResponse, CreateResponse, FindResponse, JoinResponse, LeaveRequest } from '@proto/team/team';
import { ApiSocketioService } from './socketio.service';

import type { AuthenticatedRequest } from '@api/types/authenticated-request';

@Controller('socketio')
export class ApiSocketioController {
  constructor(private readonly socketioService: ApiSocketioService) {}

  @Post('send')
  create(@Body() body: any, @Req() req: AuthenticatedRequest): Promise<any> {
    console.log(body)
    return this.socketioService.send(body, req);
  }
}