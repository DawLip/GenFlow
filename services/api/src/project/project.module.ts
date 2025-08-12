import { Module } from '@nestjs/common';
import { ApiProjectController } from './project.controller';
import { ApiProjectService } from './project.service';
import { ApiService } from '@api/api/api.service';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Module({
  controllers: [ApiProjectController],
  providers: [ApiProjectService, ApiService, ResponseService],
  exports: [ApiProjectService],
})
export class ProjectModule {}