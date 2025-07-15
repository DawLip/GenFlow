import { Module } from '@nestjs/common';
import { ApiEmailController } from './email.controller';
import { ApiEmailService } from './email.service';
import { ApiService } from '@api/api/api.service';
import { EmailProvider } from './email.provider';

@Module({
  controllers: [ApiEmailController],
  providers: [ApiEmailService, ApiService, EmailProvider],
  exports: [ApiEmailService],
})
export class EmailModule {}