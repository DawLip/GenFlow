import { Module } from '@nestjs/common';
import { HealthController } from '@socket.io/app/health.controller';

@Module({
  imports: [],
  controllers: [HealthController],
})
export class AppModule {}
