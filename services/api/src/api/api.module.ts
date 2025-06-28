import { Module } from '@nestjs/common';
import { HealthController } from '@api/api/health.controller';
import { ApiController } from '@api/api/api.controller';
import { ApiService } from '@api/api/api.service';

@Module({
  imports: [],
  controllers: [HealthController, ApiController],
  providers: [ApiService],
})
export class ApiModule {}
