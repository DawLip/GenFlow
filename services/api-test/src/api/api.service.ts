import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { services_config } from '@libs/shared/src/services_config';
import { AuthServiceClient } from '@proto/auth/auth.client';
import { ProjectServiceClient } from '@proto/project/project.client';
import { firstValueFrom } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import type { Request } from 'express';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';

@Injectable()
export class ApiService implements OnModuleInit {
  constructor(
    private readonly logger: PinoLogger,
  ) {}
  @Client(gRPC_client('auth'))
  private authClient:ClientGrpc;
  private authService:AuthServiceClient;

  @Client(gRPC_client('project'))
  private projectClient:ClientGrpc;
  private projectService:ProjectServiceClient;

  onModuleInit():void {
    this.authService = this.authClient.getService<AuthServiceClient>('AuthService');
    this.projectService = this.projectClient.getService<ProjectServiceClient>('ProjectService');
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

  handleValidationError(response:any, logData:any, logMsg?:string):any {
    const res = {...response, res:{ok:false, status:"ERROR", ...response.res}};
    this.logger.error({response:res, ...logData }, logMsg || response.res.msg);
    return res;
  }

  handleSuccessResponse(response:any, logData:any, logMsg?:string):any {
    const res = {...response, res:{ok:true, status:"SUCCESS", ...response.res}};
    this.logger.info({response:res, ...logData }, logMsg || response.res.msg);
    return res;
  }
}
