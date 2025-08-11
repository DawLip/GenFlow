import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core'; 
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from '@api/auth/auth.module';
import { ProjectModule } from '@api/project/project.module';
import { TeamModule } from '@api/team/team.module';
import { EmailModule } from '@api/email/email.module';

import { AuthGuard } from '@api/guards/auth.guard';
import { createHealthController } from '@shared/health/health.controller';
import { ApiService } from '@api/api/api.service';

import { services_config } from '@shared/services_config';
import { service_name } from '@shared/service_name'
import { name } from '../../package.json';
import { SocketioModule } from '@api/socketio/socketio.module';
import { UserModule } from '@api/user/user.module';


const sName = service_name(name);
const HealthController = createHealthController(sName);

@Module({
  imports: [
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
    }
  ],
})
export class ApiModule {}
