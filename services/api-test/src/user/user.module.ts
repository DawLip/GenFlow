import { Module } from '@nestjs/common';
import { ApiUserController } from './user.controller';
import { ApiUserService } from './user.service';
import { ApiService } from '@api-test/api/api.service';

@Module({
  controllers: [ApiUserController],
  providers: [ApiUserService, ApiService],
  exports: [ApiUserService],
})
export class UserModule {}