import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core'; 
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from '@api/auth/auth.module';
import { ProjectModule } from '@api/project/project.module';
import { TeamModule } from '@api/team/team.module';
import { EmailModule } from '@api/email/email.module';

import { AuthGuard } from '@api/guards/auth.guard';
import { createHealthController } from '@libs/shared/src/sharedServices/health.controller';
import { ApiService } from '@api/api/api.service';

import { service_name } from '@shared/service_name'
import { name } from '../../package.json';
import { SocketioModule } from '@api/socketio/socketio.module';
import { UserModule } from '@api/user/user.module';
import { pinoConfig } from '@libs/shared/src/config/pino.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';


const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
  LoggerModule.forRoot(pinoConfig({ sName })),
    AuthModule,
    UserModule,
    TeamModule,
    ProjectModule,
    EmailModule,
    SocketioModule
  ],
  controllers: [HealthController],
  providers: [
    ApiService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ResponseService
  ],
  exports: [ApiService, ResponseService],
})
export class ApiModule {}
