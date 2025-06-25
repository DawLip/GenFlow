import { Module } from '@nestjs/common';
import { HealthController } from '@graphql/app/health.controller';

@Module({
  imports: [],
  controllers: [HealthController],
})
export class AppModule {}
