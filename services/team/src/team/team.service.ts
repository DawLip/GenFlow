import { Injectable } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse
} from '@proto/team/team';
import * as jwt from 'jsonwebtoken';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team as TeamSchema, TeamDocument } from '@shared/schema/team.shema';
import { Team } from '@shared/types/Team.type'


@Injectable()
export class TeamService {
  constructor(
    @InjectModel(TeamSchema.name) private teamModel: Model<TeamDocument>,
    private readonly logger: PinoLogger,
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    const createdTeam:Team|any = await this.teamModel.create(data);
    this.logger.info({input: data, user: createdTeam, context:"create"}, "Team created")
    return {
      id: createdTeam._id.toString(),
      status: "SUCCESS",
      msg: "Team created",
    };
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    const updatedTeam = await this.teamModel.findByIdAndUpdate(
      data.id,
      { ...data },
      { new: true },
    );

    if (!updatedTeam) {
      this.logger.warn({input: data, user: updatedTeam, context:"update"}, "Team not found")
      return { status: 'ERROR', msg: 'Team not found' };
    }

    this.logger.info({input: data, user: updatedTeam, context:"update"}, "Team created")
    return {
      status: 'SUCCESS',
      msg: 'Team updated',
    };
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    const foundTeam = await this.teamModel.findById(data.id).lean();

    if (!foundTeam) {
      this.logger.warn({input: data, foundTeam: foundTeam, context:"findOneById"}, "Team not found")
      return {
        status: 'ERROR',
        msg: 'Team not found',
      };
    }

    this.logger.info({input: data, foundTeam: foundTeam, context:"findOneById"}, "Team found")
    return {
      status: 'SUCCESS',
      msg: 'Team found',
      team: {
        ...foundTeam,
        id: foundTeam._id.toString(),
      },
    };
  }
}
