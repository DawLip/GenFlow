import { Module } from '@nestjs/common';
import { ApiAuthController } from './auth.controller';
import { ApiAuthService } from './auth.service';
import { ApiService } from '@api/api/api.service';

@Module({
  controllers: [ApiAuthController],
  providers: [ApiAuthService, ApiService],
  exports: [ApiAuthService],
})
export class AuthModule {}