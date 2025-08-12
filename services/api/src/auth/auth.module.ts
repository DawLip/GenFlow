import { Module } from '@nestjs/common';
import { ApiAuthController } from './auth.controller';
import { ApiAuthService } from './auth.service';
import { ApiService } from '@api/api/api.service';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Module({
  controllers: [ApiAuthController],
  providers: [ApiAuthService, ApiService, ResponseService],
  exports: [ApiAuthService],
})
export class AuthModule {}