import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { createHealthController } from '@libs/shared/src/sharedServices/health.controller';
import { EmailService } from '@email/email/email.service';

import { name } from '../../package.json';
import { service_name } from '@shared/service_name'
import { EmailConsumer } from './email.consumer';
import { CustomMailProvider } from './custom.provider';
import { pinoConfig } from '@libs/shared/src/config/pino.config';

const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
    LoggerModule.forRoot(pinoConfig({ sName })),
  ],
  controllers: [HealthController, EmailConsumer],
  providers: [EmailService, CustomMailProvider],
})
export class EmailModule {}
