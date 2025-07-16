import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, JoinRequest, LeaveResponse, UpdateResponse, CreateResponse, FindResponse, JoinResponse, LeaveRequest } from '@proto/team/team';
import { ApiEmailService } from './email.service';

import type { AuthenticatedRequest } from '@api-test/types/authenticated-request';

@Controller('email')
export class ApiEmailController {
  constructor(private readonly emailService: ApiEmailService) {}

  @Post('send')
  create(@Body() body: any, @Req() req: AuthenticatedRequest): Promise<any> {
    return this.emailService.send(body, req);
  }
}