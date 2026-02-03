import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { createHealthController } from '@libs/shared/src/sharedServices/health.controller';
import { TeamController } from '@team/team/team.controller';
import { TeamService } from '@team/team/team.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from '@shared/schema/team.shema'

import { services_config } from '@libs/shared/src/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'
import { pinoConfig } from '@libs/shared/src/config/pino.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { EmailProvider } from './email.provider';

const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
    MongooseModule.forRoot(`${services_config.service_url.mongodb}/GenFlow`),
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
    LoggerModule.forRoot(pinoConfig({ sName })),
  ],
  controllers: [HealthController, TeamController],
  providers: [TeamService, EmailProvider, ResponseService],
})
export class TeamModule {}
