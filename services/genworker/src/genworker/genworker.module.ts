import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { createHealthController } from '@shared/health/health.controller';
import { GenWorkerController } from '@genworker/genworker/genworker.controller';
import { GenWorkerService } from '@genworker/genworker/services/genworker.service';

import { MongooseModule } from '@nestjs/mongoose';
import { GenWorker, GenWorkerSchema } from '@shared/schema/genworker.schema';

import { services_config } from '@libs/shared/src/services_config';
import { name } from '../../package.json';
import { service_name } from '@libs/shared/src/service_name'
import { Team, TeamSchema } from '@libs/shared/src/schema/team.shema';
import { TasksQueueService } from './services/tasks_queue.service';

const sName = service_name(name);
const HealthController = createHealthController(sName);

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
            labels: { service: `gf_${sName}` },
            interval: 5,
            timeout: 3000,
          },
        },
      },
    }),
  ],
  controllers: [HealthController, GenWorkerController],
  providers: [GenWorkerService, TasksQueueService],
})
export class GenWorkerModule {}
