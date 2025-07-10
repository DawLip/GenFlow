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
    return this.handleSuccessResponse({res:{msg:"project created"}, id: createdTeam._id.toString(),}, {context:"create"});
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    const updatedTeam = await this.teamModel.findByIdAndUpdate(
      data.id,
      { ...data },
      { new: true },
    );

    if (!updatedTeam) return this.handleValidationError({res:{msg:"team not found"},}, {context:"update"});

    return this.handleSuccessResponse({res:{msg:"team updated"}}, {context:"update"});
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    const foundTeam = await this.teamModel.findById(data.id).lean();

    if (!foundTeam) return this.handleValidationError({res:{msg:"team not found"},}, {context:"findOneById"});

    return this.handleSuccessResponse({
      res:{msg:"team found"},
      team: {...foundTeam, id: foundTeam._id.toString()}
    }, {context:"findOneById"});
  }

  handleValidationError(response:any, logData:any, logMsg?:string):any {
    const res = {...response, res:{ok:false, status:"ERROR", ...response.res}};
    this.logger.error({response:res, ...logData }, logMsg || response.msg);
    return res;
  }

  handleSuccessResponse(response:any, logData:any, logMsg?:string):any {
    const res = {...response, res:{ok:true, status:"SUCCESS", ...response.res}};
    this.logger.info({response:res, ...logData }, logMsg || response.msg);
    return res;
  }
}
