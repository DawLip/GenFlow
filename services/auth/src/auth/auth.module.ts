import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { createHealthController } from '@libs/shared/src/sharedServices/health.controller';
import { AuthController } from '@auth/auth/auth.controller';
import { AuthService } from '@auth/auth/auth.service';

import { name } from '../../package.json';
import { service_name } from '@libs/shared/src/service_name'
import { services_config } from '@libs/shared/src/services_config';
import { EmailProvider } from './email.provider';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { pinoConfig } from '@libs/shared/src/config/pino.config';

const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
    LoggerModule.forRoot(pinoConfig({ sName })),
  ],
  controllers: [HealthController, AuthController],
  providers: [AuthService, EmailProvider, ResponseService],
})
export class AuthModule {}
