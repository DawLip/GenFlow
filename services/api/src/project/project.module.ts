import { Module } from '@nestjs/common';
import { ApiProjectController } from './project.controller';
import { ApiProjectService } from './project.service';
import { ApiService } from '@api/api/api.service';

@Module({
  controllers: [ApiProjectController],
  providers: [ApiProjectService, ApiService],
  exports: [ApiProjectService],
})
export class ProjectModule {}