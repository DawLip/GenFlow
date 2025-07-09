import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
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
import { Public } from '@api/guards/auth.public';

interface AuthenticatedRequest extends Request {
  user: { id: string };
}

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Public()
  @Post('auth/login')
  async login(@Body() body: LoginRequest) { 
    return this.apiService.login(body); 
  }

  @Public()
  @Post('auth/register')
  async register(@Body() body: RegisterRequest) { 
    return this.apiService.register(body); 
  }

  @Post('project/create')
  async project_create(@Body() body: CreateRequest, @Req() req: AuthenticatedRequest) { 
    return this.apiService.project_create(body, req); 
  }

  @Post('project/update')
  async project_update(@Body() body: UpdateRequest, @Req() req: AuthenticatedRequest) { 
    return this.apiService.project_update(body, req); 
  }

  @Post('project/findOneById')
  async project_findOneById(@Body() body: FindOneByIdRequest, @Req() req: AuthenticatedRequest) { 
    return this.apiService.project_findOneById(body, req); 
  }
}
