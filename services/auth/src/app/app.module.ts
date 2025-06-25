import { Module } from '@nestjs/common';
import { HealthController } from '@auth/app/health.controller';

@Module({
  imports: [],
  controllers: [HealthController],
})
export class AppModule {}
