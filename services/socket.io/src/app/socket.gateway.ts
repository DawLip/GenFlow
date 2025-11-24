import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { PinoLogger } from 'nestjs-pino';
import { subscribe } from 'diagnostics_channel';

@WebSocketGateway({ cors: true, path: '/socket.io' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private socketService: SocketService, 
    private readonly logger: PinoLogger
  ) {}

  afterInit(server: Server) {
    this.socketService.setServer(server);
  }

  async handleConnection(client: Socket) {
    console.log('handleConnection')
    this.socketService.handleConnection(client);
  }

  handleDisconnect(client: Socket) {
    this.logger.info({socketID:client.id, userID:client.data?.user?.id, context:"handleDisconnect"}, `client disconnected`);
  }

  @SubscribeMessage('join_flow_room') 
  join_flow_room(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    this.socketService.join_flow_room(data, client);
  }

  @SubscribeMessage('flow_mouse_move') 
  flow_mouse_move(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    this.socketService.flow_mouse_move(data, client);
  }

  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    client.emit('pong', { msg: 'pong from server' });
  }

  @SubscribeMessage('signal')
  signal(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    this.socketService.signal(data, client);
  }

  @SubscribeMessage('get_signal')
  getSignal(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    this.socketService.getSignal(data, client);
  }
}
