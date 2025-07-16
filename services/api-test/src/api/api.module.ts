import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core'; 
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from '@api-test/auth/auth.module';
import { ProjectModule } from '@api-test/project/project.module';
import { TeamModule } from '@api-test/team/team.module';
import { EmailModule } from '@api-test/email/email.module';

import { AuthGuard } from '@api-test/guards/auth.guard';
import { HealthController } from '@api-test/api/health.controller';
import { ApiService } from '@api-test/api/api.service';

import { services_config } from '@shared/services_config';
import { service_name } from '@shared/service_name'
import { name } from '../../package.json';
import { SocketioModule } from '@api-test/socketio/socketio.module';


const s_name = service_name(name);

@Module({
  imports: [
  LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
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
    AuthModule,
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
