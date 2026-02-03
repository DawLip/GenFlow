import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { createHealthController } from '@libs/shared/src/sharedServices/health.controller';
import { UserController } from '@user/user/user.controller';
import { UserService } from '@user/user/user.service';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@shared/schema/user.shema'

import { services_config } from '@shared/services_config';
import { name } from '../../package.json';
import { service_name } from '@shared/service_name'
import { pinoConfig } from '@libs/shared/src/config/pino.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
    MongooseModule.forRoot(`${services_config.service_url.mongodb}/GenFlow`),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    LoggerModule.forRoot(pinoConfig({ sName })),
  ],
  controllers: [HealthController, UserController],
  providers: [UserService, ResponseService],
})
export class UserModule {}
