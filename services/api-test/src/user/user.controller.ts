import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, CreateResponse, UpdateResponse, } from '@proto/user/user';
import { ApiUserService } from './user.service';

import type { AuthenticatedRequest } from '@api-test/types/authenticated-request';

@Controller('user')
export class ApiUserController {
  constructor(private readonly apiUserService: ApiUserService) {}

  @Post('create')
  create(@Body() body: CreateRequest, @Req() req: AuthenticatedRequest): Promise<CreateResponse> {
    return this.apiUserService.create(body, req);
  }

  @Post('update')
  update(@Body() body: UpdateRequest, @Req() req: AuthenticatedRequest): Promise<UpdateResponse> {
    return this.apiUserService.update(body, req);
  }

  @Post('findOneById')
  findOneById(@Body() body: FindOneByIdRequest, @Req() req: AuthenticatedRequest): Promise<FindOneByIdRequest> {
    return this.apiUserService.findOneById(body, req);
  }
}