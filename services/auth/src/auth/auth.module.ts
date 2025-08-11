import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { createHealthController } from '@shared/health/health.controller';
import { AuthController } from '@auth/auth/auth.controller';
import { AuthService } from '@auth/auth/auth.service';

import { name } from '../../package.json';
import { service_name } from '@libs/shared/src/service_name'
import { services_config } from '@libs/shared/src/services_config';
import { EmailProvider } from './email.provider';

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
  controllers: [HealthController, AuthController],
  providers: [AuthService, EmailProvider],
})
export class AuthModule {}
