import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { createHealthController } from '@shared/sharedServices/health.controller';

import { services_config } from '@shared/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'
import { pinoConfig } from '@libs/shared/src/config/pino.config';

const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
    LoggerModule.forRoot(pinoConfig({ sName })),
  ],
  controllers: [HealthController],
})
export class AppModule {}
