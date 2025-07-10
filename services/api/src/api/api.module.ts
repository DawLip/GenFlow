import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core'; 
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from '@api/auth/auth.module';
import { ProjectModule } from '@api/project/project.module';

import { AuthGuard } from '@api/guards/auth.guard';
import { HealthController } from '@api/api/health.controller';
import { ApiService } from '@api/api/api.service';

import { services_config } from '@shared/services_config';
import { service_name } from '@shared/service_name'
import { name } from '../../package.json';

const s_name = service_name(name);

@Module({
  imports: [
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
    AuthModule,
    ProjectModule
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
