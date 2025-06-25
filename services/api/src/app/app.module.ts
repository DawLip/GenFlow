import { Module } from '@nestjs/common';
import { HealthController } from '@api/app/health.controller';

@Module({
  imports: [],
  controllers: [HealthController],
})
export class AppModule {}
