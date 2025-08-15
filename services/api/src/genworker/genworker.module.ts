import { Module } from '@nestjs/common';
import { ApiGenWorkerController } from './genworker.controller';
import { ApiGenWorkerService } from './genworker.service';
import { ApiService } from '@api/api/api.service';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Module({
  controllers: [ApiGenWorkerController],
  providers: [ApiGenWorkerService, ApiService, ResponseService],
  exports: [ApiGenWorkerService],
})
export class GenWorkerModule {}