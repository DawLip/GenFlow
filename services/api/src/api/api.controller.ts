import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiService } from '@api/api/api.service';
import { AuthGuard } from '@api/guards/auth.guard';
import {
  RegisterRequest,
  LoginRequest,
} from '@proto/auth/auth';
import {
  CreateRequest,
  FindOneByIdRequest,
  UpdateRequest
} from '@proto/project/project';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('auth/login')
  async login(@Body() body: LoginRequest) { return this.apiService.login(body); }

  @Post('auth/register')
  async register(@Body() body: RegisterRequest) { return this.apiService.register(body); }

  @Post('project/create')
  async project_create(@Body() body: CreateRequest) { return this.apiService.project_create(body); }

  @Post('project/update')
  async project_update(@Body() body: UpdateRequest) { return this.apiService.project_update(body); }

  @Post('project/findOneById')
  async project_findOneById(@Body() body: FindOneByIdRequest) { return this.apiService.project_findOneById(body); }

  @UseGuards(AuthGuard)
  @Get('test2')
  async test2() {
    return { message: 'Protected route works!' };
  }
}
