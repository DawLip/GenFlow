import { Module } from '@nestjs/common';
import { ApiTeamController } from './team.controller';
import { ApiTeamService } from './team.service';
import { ApiService } from '@api/api/api.service';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Module({
  controllers: [ApiTeamController],
  providers: [ApiTeamService, ApiService, ResponseService],
  exports: [ApiTeamService],
})
export class TeamModule {}