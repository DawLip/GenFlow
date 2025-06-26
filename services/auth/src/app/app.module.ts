import { Module } from '@nestjs/common';
import { HealthController } from '@auth/app/health.controller';
import { AppController } from '@auth/app/app.controller';
import { AuthService } from '@auth/app/app.service';

@Module({
  imports: [],
  controllers: [HealthController, AppController],
  providers: [AuthService],
})
export class AppModule {}
