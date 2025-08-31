import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { createHealthController } from '@libs/shared/src/sharedServices/health.controller';

import { name } from '../../package.json';
import { service_name } from '@shared/service_name'
import { SocketGateway } from '@socket.io/app/socket.gateway';
import { SocketService } from './socket.service';
import { NotificationsGateway } from './notifications.gateway';
import { pinoConfig } from '@libs/shared/src/config/pino.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { SocketController } from './socket.controller';

const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
    LoggerModule.forRoot(pinoConfig({ sName })),
  ],
  controllers: [HealthController, NotificationsGateway, SocketController],
  providers: [SocketService, SocketGateway, ResponseService],
})
export class AppModule {}
