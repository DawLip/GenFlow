import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { HealthController } from '@user/user/health.controller';
import { UserController } from '@user/user/user.controller';
import { UserService } from '@user/user/user.service';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@shared/schema/user.shema'

import { services_config } from '@shared/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'
import { Team, TeamSchema } from '@libs/shared/src/schema/team.shema';

const s_name = service_name(name);

@Module({
  imports: [
    MongooseModule.forRoot(`${services_config.service_url.mongodb}/GenFlow`),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
  controllers: [HealthController, UserController],
  providers: [UserService],
})
export class UserModule {}
