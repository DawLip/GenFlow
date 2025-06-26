import { Module } from '@nestjs/common';
import { HealthController } from '@api/app/health.controller';
import { AppController } from '@api/app/app.controller';
import { AppService } from '@api/app/app.service';

@Module({
  imports: [],
  controllers: [HealthController, AppController],
  providers: [AppService],
})
export class AppModule {}
