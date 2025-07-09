import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { services_config } from '@libs/shared/src/services_config';
import { AuthServiceClient } from '@proto/auth/auth.client';
import { ProjectServiceClient } from '@proto/project/project.client';
import { firstValueFrom } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import type { Request } from 'express';

import {
  RegisterRequest,
  LoginRequest,
} from '@proto/auth/auth';
import {
  CreateRequest,
  FindOneByIdRequest,
  UpdateRequest
} from '@proto/project/project';

interface AuthenticatedRequest extends Request {
  user: { id: string };
}

@Injectable()
export class ApiService implements OnModuleInit {
  constructor(
    private readonly logger: PinoLogger,
  ) {}
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: require.resolve('@proto/auth/auth.proto'),
      url: services_config.service_url.auth_rpc,
    },
  })
  private authClient:ClientGrpc;
  private authService:AuthServiceClient;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'project',
      protoPath: require.resolve('@proto/project/project.proto'),
      url: services_config.service_url.project_rpc,
    },
  })
  private projectClient:ClientGrpc;
  private projectService:ProjectServiceClient;

  onModuleInit():void {
    this.authService = this.authClient.getService<AuthServiceClient>('AuthService');
    this.projectService = this.projectClient.getService<ProjectServiceClient>('ProjectService');
  }

  login(body: LoginRequest) {
    return this.authService.login(body);
  }

  register(body: RegisterRequest) {
    return this.authService.register(body);
  }

  async project_create(body: CreateRequest, req: AuthenticatedRequest) {
    return await firstValueFrom(this.projectService.create({...body, ownerId: req.user.id}));
  }

  async project_update(body: UpdateRequest, req: AuthenticatedRequest) {
    return await firstValueFrom(this.projectService.update(body));
  }

  async project_findOneById(body: FindOneByIdRequest, req: AuthenticatedRequest) {
    return await firstValueFrom(this.projectService.findOneById(body));
  }

  async validate(token: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.authService.validate({ token }));
      return !!response?.id; 
    } catch {
      return false;
    }
  }

  async getUserFromToken(token: string) {
    return await firstValueFrom(this.authService.validate({ token }));
  }
}
