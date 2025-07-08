import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { ProxyModule } from '@gateway/proxy/proxy.module';
import { HealthController } from '@gateway/app/health.controller';

import { services_config } from '@shared/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'

const s_name = service_name(name);

@Module({
  imports: [
    ProxyModule,
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
  controllers: [HealthController],
})
export class AppModule {}
