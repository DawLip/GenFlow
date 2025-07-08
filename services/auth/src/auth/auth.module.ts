import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { HealthController } from '@auth/auth/health.controller';
import { AuthController } from '@auth/auth/auth.controller';
import { AuthService } from '@auth/auth/auth.service';

import { name } from '../../package.json';
import { service_name } from '@libs/shared/src/lib/service_name'
import { services_config } from '@libs/shared/src/lib/services_config';

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
  controllers: [HealthController, AuthController],
  providers: [AuthService],
})
export class AuthModule {}
