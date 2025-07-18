import { Module } from '@nestjs/common';
import { ApiTeamController } from './team.controller';
import { ApiTeamService } from './team.service';
import { ApiService } from '@api/api/api.service';

@Module({
  controllers: [ApiTeamController],
  providers: [ApiTeamService, ApiService],
  exports: [ApiTeamService],
})
export class TeamModule {}