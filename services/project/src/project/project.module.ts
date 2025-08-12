import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { createHealthController } from '@libs/shared/src/sharedServices/health.controller';
import { ProjectController } from '@project/project/project.controller';
import { ProjectService } from '@project/project/project.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '@shared/schema/project.shema'

import { services_config } from '@libs/shared/src/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'
import { pinoConfig } from '@libs/shared/src/config/pino.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
    MongooseModule.forRoot(`${services_config.service_url.mongodb}/GenFlow`),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    LoggerModule.forRoot(pinoConfig({ sName })),
  ],
  controllers: [HealthController, ProjectController],
  providers: [ProjectService, ResponseService],
})
export class ProjectModule {}
