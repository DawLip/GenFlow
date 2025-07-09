import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { HealthController } from '@project/project/health.controller';
import { ProjectController } from '@project/project/project.controller';
import { ProjectService } from '@project/project/project.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '@shared/schema/project.shema'

import { services_config } from '@libs/shared/src/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'

const s_name = service_name(name);

@Module({
  imports: [
    MongooseModule.forRoot(`${services_config.service_url.mongodb}/GenFlow`),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
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
  controllers: [HealthController, ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
