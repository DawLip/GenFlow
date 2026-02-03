import { Module } from '@nestjs/common';
import { ApiUserController } from './user.controller';
import { ApiUserService } from './user.service';
import { ApiService } from '@api/api/api.service';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Module({
  controllers: [ApiUserController],
  providers: [ApiUserService, ApiService, ResponseService],
  exports: [ApiUserService],
})
export class UserModule {}