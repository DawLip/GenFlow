import { Module } from '@nestjs/common';

import { LoggerModule } from 'nestjs-pino';

import { HealthController } from '@api/api/health.controller';
import { ApiController } from '@api/api/api.controller';
import { ApiService } from '@api/api/api.service';

import { services_config } from '@libs/shared/src/services_config';
import { name } from '../../package.json';
import { service_name } from '@libs/shared/src/service_name'

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
  controllers: [HealthController, ApiController],
  providers: [ApiService],
})
export class ApiModule {}
