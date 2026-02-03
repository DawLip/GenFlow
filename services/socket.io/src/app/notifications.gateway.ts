import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SocketService } from './socket.service';

@Controller()
export class NotificationsGateway {
  constructor(private readonly socketService: SocketService) {}

  @EventPattern('notify_user')
  handleNotifyUser(@Payload() data: any) {
    const { userId, event, payload } = data;

    this.socketService.emitToUser(userId, event, payload);
  }
}
