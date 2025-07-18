import { Controller, Post, Body, Req, Patch } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, CreateResponse, UpdateResponse, } from '@proto/user/user';
import { ApiUserService } from './user.service';

import type { AuthenticatedRequest } from '@api-test/types/authenticated-request';

@Controller('users')
export class ApiUserController {
  constructor(private readonly apiUserService: ApiUserService) {}
  
  @Post(':userId')
  findOneById(@Body() body: FindOneByIdRequest, @Req() req: AuthenticatedRequest): Promise<FindOneByIdRequest> {
    return this.apiUserService.findOneById(body, req, {});
  }

  @Patch('update')
  patch(@Body() body: UpdateRequest, @Req() req: AuthenticatedRequest): Promise<UpdateResponse> {
    return this.apiUserService.update(body, req, {});
  }

}