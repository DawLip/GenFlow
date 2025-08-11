import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { HealthController } from '@genworker/genworker/health.controller';
import { GenWorkerController } from '@genworker/genworker/genworker.controller';
import { GenWorkerService } from '@genworker/genworker/genworker.service';

import { MongooseModule } from '@nestjs/mongoose';
import { GenWorker, GenWorkerSchema } from '@shared/schema/genworker.schema';

import { services_config } from '@shared/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'
import { Team, TeamSchema } from '@libs/shared/src/schema/team.shema';

const s_name = service_name(name);

@Module({
  imports: [
  MongooseModule.forRoot(`${services_config.service_url.mongodb}/GenFlow`),
    MongooseModule.forFeature([{ name: GenWorker.name, schema: GenWorkerSchema }]),
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
  controllers: [HealthController, GenWorkerController],
  providers: [GenWorkerService],
})
export class GenWorkerModule {}
