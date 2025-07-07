import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { HealthController } from '@user/user/health.controller';
import { UserController } from '@user/user/user.controller';
import { UserService } from '@user/user/user.service';

import { MongooseModule } from '@nestjs/mongoose';
import { services_config } from '@shared/lib/services_config';
import { User, UserSchema } from '@shared/schema/user.shema'


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
            labels: { service:"gf_user" }, 
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
