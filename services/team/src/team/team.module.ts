import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { HealthController } from '@team/team/health.controller';
import { TeamController } from '@team/team/team.controller';
import { TeamService } from '@team/team/team.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from '@shared/schema/team.shema'

import { services_config } from '@libs/shared/src/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'

const s_name = service_name(name);

@Module({
  imports: [
    MongooseModule.forRoot(`${services_config.service_url.mongodb}/GenFlow`),
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
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
  controllers: [HealthController, TeamController],
  providers: [TeamService],
})
export class TeamModule {}
