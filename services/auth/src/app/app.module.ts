import { Module } from '@nestjs/common';
import { HealthController } from '@auth/app/health.controller';
import { AppController } from '@auth/app/app.controller';

@Module({
  imports: [],
  controllers: [HealthController, AppController],
})
export class AppModule {}
