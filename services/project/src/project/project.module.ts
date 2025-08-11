import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { createHealthController } from '@libs/shared/src/health/health.controller';
import { ProjectController } from '@project/project/project.controller';
import { ProjectService } from '@project/project/project.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '@shared/schema/project.shema'

import { services_config } from '@libs/shared/src/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'

const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
    MongooseModule.forRoot(`${services_config.service_url.mongodb}/GenFlow`),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
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
  controllers: [HealthController, ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
