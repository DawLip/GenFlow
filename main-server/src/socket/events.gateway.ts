import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import config from '@/../config';

@WebSocketGateway(3011)  
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() server: Server;  

  constructor(
    private authService: AuthService
  ) {}

  afterInit() {
    console.log('WebSocket server initialized');
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.auth?.token?.replace(/^Bearer /, "") || "";
    const payload = await this.authService.verify(token);
    console.log(`Client attempt to connect: ${client.id}`);
    if (!payload) {
      console.log(`Client failed to connect: ${client.id}`);
      client.disconnect();
      return;
    }
    console.log(`Client connected: ${client.id}`);
    client.data.user = payload;
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}

