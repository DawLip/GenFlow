import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { ProxyModule } from '@gateway/proxy/proxy.module';
import { createHealthController } from '@shared/health/health.controller';

import { services_config } from '@shared/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'

const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
    ProxyModule,
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
  controllers: [HealthController],
})
export class AppModule {}
