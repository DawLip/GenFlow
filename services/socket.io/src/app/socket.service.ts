import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { services_config } from '@libs/shared/src/services_config';
import { AuthServiceClient } from '@proto/auth/auth.client';
import { firstValueFrom } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import type { Request } from 'express';
import { Socket } from 'socket.io';


interface AuthenticatedRequest extends Request {
  user: { id: string };
}

@Injectable()
export class SocketService implements OnModuleInit {
  constructor(private readonly logger: PinoLogger) {}
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


  onModuleInit():void {
    this.authService = this.authClient.getService<AuthServiceClient>('AuthService');
  }

  async handleConnection(client: Socket) {
      const token =
        client.handshake.auth?.token?.replace('Bearer ', '') ||
        client.handshake.headers?.authorization?.replace('Bearer ', '') ||
        client.handshake.query?.token?.toString();
      if(!token) { client.disconnect(); return; }
  
      const payload = await this.getUserFromToken(token)
      if(!payload) { client.disconnect(); return; }
  
      client.data.user = payload;
  
      this.logger.info({socketID:client.id, userID:client.data.user.id}, `client connected`);
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
}
