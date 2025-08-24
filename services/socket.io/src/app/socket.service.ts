import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { services_config } from '@libs/shared/src/services_config';
import { AuthServiceClient } from '@proto/auth/auth.client';
import { first, firstValueFrom } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import type { Request } from 'express';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { ProjectServiceClient } from '@proto/project/project.client';
import { UserServiceClient } from '@proto/user/user.client';
import { GenWorkerServiceClient } from '@proto/genworker/genworker.client';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { DefaultResponse, EmitRequest, JoinRequest } from '@proto/socketio/socketio';


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
  @Client(gRPC_client('auth'))
  private authClient:ClientGrpc;
  private authService:AuthServiceClient;

  @Client(gRPC_client('project'))
  private projectClient:ClientGrpc;
  private projectService:ProjectServiceClient;

  @Client(gRPC_client('genworker'))
  private genworkerClient:ClientGrpc;
  private genworkerService:GenWorkerServiceClient;


  onModuleInit():void {
    this.authService = this.authClient.getService<AuthServiceClient>('AuthService');
    this.projectService = this.projectClient.getService<ProjectServiceClient>('ProjectService');
    this.genworkerService = this.genworkerClient.getService<GenWorkerServiceClient>('GenWorkerService');
  }

  async handleConnection(client: Socket) {
      const token =
        client.handshake.auth?.token?.replace('Bearer ', '') ||
        client.handshake.headers?.authorization?.replace('Bearer ', '') ||
        client.handshake.query?.token?.toString();
      if(!token) return this.handleDisconnection(client, {context:"handleConnection"}, "token is required", "error");

      const payload = await this.getUserFromToken(token)
      if(!payload?.id) return this.handleDisconnection(client, {token, context:"handleConnection"}, "auth failed", "error");

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
      path: data.path,
      data: JSON.stringify(dataParams)
    })

    return await firstValueFrom(this.projectService.updateFlowData(updateFlowDataReq(data.data)));
  }

  handleDisconnection(client: Socket, logData: any, msg: string, logType:string = "info"){
    this.logger[logType](logData, msg);
    client.disconnect();
  }

  async genworker_register(data: any, client: Socket){
    // this.io.to()
    await firstValueFrom(this.genworkerService.register({...data, ownerId: data.userId}));
  }

  async emit(data: EmitRequest): Promise<DefaultResponse> {
    this.logger.trace({context:"emit", payload:data}, "emit request received");
    
    this.io.to(data.room).emit(data.event, data.data);
    return {res:{ ok: true, status: "SUCCESS", msg: "emit success" }};
  }

  async join(data: JoinRequest): Promise<DefaultResponse> {
    (await this.io.to(data.objectId).fetchSockets())[0].join(data.room);

    return {res:{ ok: true, status: "SUCCESS", msg: "join success" }};
  }

  genworker_assign(data: any, client: Socket){
    client.join(`worker--${client.data.user.id}--${data.name}`);
    data.assignTo.forEach((joinRoom:string) => client.join(joinRoom));
  }
}
