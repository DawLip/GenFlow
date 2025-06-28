import { Module } from '@nestjs/common';
import { HealthController } from '@auth/auth/health.controller';
import { AuthController } from '@auth/auth/auth.controller';
import { AuthService } from '@auth/auth/auth.service';

@Module({
  imports: [],
  controllers: [HealthController, AuthController],
  providers: [AuthService],
})
export class AuthModule {}
