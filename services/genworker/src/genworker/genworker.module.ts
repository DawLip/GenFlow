import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { createHealthController } from '@libs/shared/src/sharedServices/health.controller';
import { GenWorkerController } from '@genworker/genworker/genworker.controller';
import { GenWorkerService } from '@genworker/genworker/services/genworker.service';

import { MongooseModule } from '@nestjs/mongoose';
import { GenWorker, GenWorkerSchema } from '@shared/schema/genworker.schema';
import { Task, TaskSchema } from '@shared/schema/task.shema';

import { services_config } from '@libs/shared/src/services_config';
import { name } from '../../package.json';
import { service_name } from '@libs/shared/src/service_name'
import { TaskQueueService } from './services/task_queue.service';
import { pinoConfig } from '@libs/shared/src/config/pino.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import Redis from 'ioredis';


const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
  MongooseModule.forRoot(`${services_config.service_url.mongodb}/GenFlow`),
    MongooseModule.forFeature([{ name: GenWorker.name, schema: GenWorkerSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    LoggerModule.forRoot(pinoConfig({ sName })),
      
  ],
  controllers: [HealthController, GenWorkerController],
  providers: [
    GenWorkerService, TaskQueueService, ResponseService,
    {
      provide: 'REDIS',
      useFactory: () => new Redis(services_config.service_url.redis),
    }
  ],
})
export class GenWorkerModule {}
  