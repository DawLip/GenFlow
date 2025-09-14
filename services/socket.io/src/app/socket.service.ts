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

      if(client.handshake.auth.isWorker){
        console.log(`worker joined: ${payload.id}:${client.handshake.auth.workerName}`)
        client.join(`${payload.id}:${client.handshake.auth.workerName}`);
      } else {
        console.log(`user joined: ${payload.id}`)
        client.join(`${payload.id}`);
      }
  
      this.logger.info({socketID:client.id, userID:client.data.user.id, context:"handleConnection"}, `client connected`);
    }

  async getUserFromToken(token: string) {
    return await firstValueFrom(this.authService.validate({ token }));
  }

  emitToUser(userId: string, event: string, data: any) {
    this.logger.info({response:{ res:{ok:true, status:"SUCCESS"}}, context:"emitToUser", payload:{data, event, userId} }, "message send");
    this.io.to(`${userId}`).emit(event, data);
  }

  join_flow_room(data: any, client: Socket){
    console.log('join_flow_room', data)
    const room = `${data.projectId}:${data.flowPath}${data.flowName}`;
    console.log("Joining room:", room)
    client.join(room);

    this.io.to(room).emit('user_joined', { userId: data.userId });
  }

  flow_mouse_move(data: any, client: Socket){
    const room = `${data.projectId}:${data.path}${data.flowName}`;

    client.to(room).emit('flow_mouse_move', { ...data });
  }
  
  async flow_update(data: any, client: Socket){
    const room = `${data.projectId}:${data.path}${data.flowName}`;

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
    client.join(`${client.data.user.id}:${data.name}`);
    data.assignTo.forEach((joinRoom:string) => client.join(joinRoom));
  }

  async genworker_get_nodes(data: any, client: Socket){
    // const genworker = await firstValueFrom(this.genworkerService.findOneByProject({projectId: data.projectId, flowName: data.flowName, flowPath: data.flowPath}));

    const flow = await firstValueFrom(this.projectService.findOneByNameFlow({id: data.projectId, flowName: data.flowName, path: data.flowPath}));
    if(!flow.flow) return;
    const genworker = await firstValueFrom(this.genworkerService.findOneById({id: flow.flow.genworkers?.[0]}));

    client.to(`${genworker.genworker?.ownerId}:${genworker.genworker?.name}`).emit('genworker_get_nodes', {...data, workerId: genworker.genworker?.id});
  }

  genworker_get_nodes_answer(data: any, client: Socket){
    client.to(`${data.userId}`).emit('genworker_get_nodes_answer', data);
  }

  handleNewArtifact(data: any, client: Socket){
    console.log("handleNewArtifact", data)
    const room = `${data.projectId}:${data.path}${data.flowName}`;
    console.log("room:", room)
    this.io.to(room).emit('new_artifact', { ...data });
  }

  async signal(data: any, client: Socket){
    if(data.toGenworker) {
      const genworker = this.genworkerService.findOneById({id: data.toGenworker});
      if(!genworker) return;
      data.to = `${(await firstValueFrom(genworker)).genworker?.ownerId}:${(await firstValueFrom(genworker)).genworker?.name}`;
    }
    console.log("signal: ", data.from, "->", data.to)
    this.io.to(data.to).emit('signal', {...data, socketId: client.id });
  }
  async getSignal(data: any, client: Socket){
    console.log("getSignal", data)
    console.log("clientId:", client.id)
    let genworkerId:string = data.genworkerId

    if(genworkerId.search(":") == -1) {
      const genworker = this.genworkerService.findOneById({id: data.genworkerId});
      if(!genworker) return;
      genworkerId = `${(await firstValueFrom(genworker)).genworker?.ownerId}:${(await firstValueFrom(genworker)).genworker?.name}`;
    }

    this.io.to(genworkerId).emit('get_signal', { ...data, from: client.data.user.id, to:genworkerId, socketId: client.id });
  }
}
