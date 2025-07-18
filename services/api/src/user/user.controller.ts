import { Controller, Post, Body, Req, Param, Get, Patch } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, CreateResponse, UpdateResponse, } from '@proto/user/user';
import { ApiUserService } from './user.service';

import type { AuthenticatedRequest } from '@api/types/authenticated-request';

@Controller('users')
export class ApiUserController {
  constructor(private readonly apiUserService: ApiUserService) {}

  @Get(':userId')
  findOneById(@Body() body: FindOneByIdRequest, @Req() req: AuthenticatedRequest, @Param('userId') userId: string): Promise<FindOneByIdRequest> {
    return this.apiUserService.get(body, req, {userId});
  }

  @Patch(':userId')
  update(@Body() body: UpdateRequest, @Req() req: AuthenticatedRequest, @Param('userId') userId: string): Promise<UpdateResponse> {
    return this.apiUserService.patch(body, req, {userId});
  }

}