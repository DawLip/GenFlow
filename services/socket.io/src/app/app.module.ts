import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { HealthController } from '@socket.io/app/health.controller';

import { services_config } from '@shared/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'
import { SocketGateway } from '@socket.io/app/socket.gateway';
import { SocketService } from './socket.service';
import { NotificationsGateway } from './notifications.gateway';

const s_name = service_name(name);

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-loki',
          options: {
            host: services_config.service_url.loki, 
            labels: { service: `gf_${s_name}` }, 
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
