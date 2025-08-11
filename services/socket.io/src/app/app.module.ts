import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { createHealthController } from '@shared/health/health.controller';

import { services_config } from '@shared/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'
import { SocketGateway } from '@socket.io/app/socket.gateway';
import { SocketService } from './socket.service';
import { NotificationsGateway } from './notifications.gateway';

const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-loki',
          options: {
            host: services_config.service_url.loki,
            labels: { service: `gf_${sName}` },
            interval: 5,
            timeout: 3000,
          },
        },
      },
    }),
  ],
  controllers: [HealthController, NotificationsGateway],
  providers: [SocketService, SocketGateway],
})
export class AppModule {}
