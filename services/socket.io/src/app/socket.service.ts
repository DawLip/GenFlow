import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { services_config } from '@libs/shared/src/services_config';
import { AuthServiceClient } from '@proto/auth/auth.client';
import { firstValueFrom } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import type { Request } from 'express';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { ProjectServiceClient } from '@proto/project/project.client';


interface AuthenticatedRequest extends Request {
  user: { id: string };
}

@Injectable()
export class SocketService implements OnModuleInit {
  private io: Server;

  setServer(io: Server) {
    this.io = io;
  }

  constructor(private readonly logger: PinoLogger) {}
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: require.resolve('@proto/auth/auth.proto'),
      url: services_config.service_url.auth_rpc,

      loader: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
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

  async handleConnection(client: Socket) {
      const token =
        client.handshake.auth?.token?.replace('Bearer ', '') ||
        client.handshake.headers?.authorization?.replace('Bearer ', '') ||
        client.handshake.query?.token?.toString();
      if(!token) return this.handleDisconetion(client, {context:"handleConnection"}, "token is required", "error");
  
      const payload = await this.getUserFromToken(token)
      if(!payload?.id) return this.handleDisconetion(client, {token, context:"handleConnection"}, "auth failed", "error");
  
      client.data.user = payload;

      client.join(`user-${payload.id}`);
  
      this.logger.info({socketID:client.id, userID:client.data.user.id, context:"handleConnection"}, `client connected`);
    }

  async getUserFromToken(token: string) {
    return await firstValueFrom(this.authService.validate({ token }));
  }

  emitToUser(userId: string, event: string, data: any) {
    this.logger.info({response:{ res:{ok:true, status:"SUCCESS"}}, context:"emitToUser", payload:{data, event, userId} }, "message send");
    this.io.to(`user-${userId}`).emit(event, data);
  }

  join_flow_room(data: any, client: Socket){
    console.log('join_flow_room', data)
    const room = `flow_room-${data.projectId}-${data.flowName}`;
    
    client.join(room);

    this.io.to(room).emit('user_joined', { userId: data.userId });
  }

  flow_mouse_move(data: any, client: Socket){
    const room = `flow_room-${data.projectId}-${data.flowName}`;

    client.to(room).emit('flow_mouse_move', { ...data });
  }
  
  async flow_update(data: any, client: Socket){
    const room = `flow_room-${data.projectId}-${data.flowName}`;

    client.to(room).emit('flow_update', { ...data });

    const updateFlowDataReq = (dataParams:any) => ({
      operation: data.context,
      id: data.projectId,
      flowName: data.flowName,
      data: JSON.stringify(dataParams)
    })

    switch(data.context){
      case 'addNode': await firstValueFrom(this.projectService.updateFlowData(updateFlowDataReq(data.data))); break;
      default: await firstValueFrom(this.projectService.updateFlowData(updateFlowDataReq(data.data))); break;
    }
  }

  handleDisconetion(client: Socket, logData: any, msg: string, logType:string = "info"){
    this.logger[logType](logData, msg);
    client.disconnect();
  }
}
