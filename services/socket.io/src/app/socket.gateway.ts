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

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private socketService: SocketService, 
    private readonly logger: PinoLogger
  ) {}

  async handleConnection(client: Socket) {
    this.socketService.handleConnection(client);
  }

  handleDisconnect(client: Socket) {
    this.logger.info({socketID:client.id, userID:client.data.user.id}, `client disconnected`);
  }

  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    console.log(`Received ping from ${client.id}:`, data);
    client.emit('pong', { msg: 'pong from server' });
  }
}
