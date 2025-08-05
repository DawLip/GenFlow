import { Injectable } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse,
  JoinRequest,
  JoinResponse,
  LeaveRequest,
  LeaveResponse,
  FindByUserIdRequest,
  FindByUserIdResponse
} from '@proto/team/team';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team as TeamSchema, TeamDocument } from '@shared/schema/team.shema';
import { Team } from '@shared/types/Team.type'
import { connectable, firstValueFrom } from 'rxjs';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { services_config } from '@shared/services_config';
import { ProjectServiceClient } from '@proto/project/project.client';


@Injectable()
export class TeamService {
  constructor(
    @InjectModel(TeamSchema.name) private teamModel: Model<TeamDocument>,
    private readonly logger: PinoLogger,
  ) {}

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'project',
      protoPath: require.resolve('@proto/project/project.proto'),
      url: services_config.service_url.project_rpc,
    },
  })
  private client: ClientGrpc;

  private projectService: ProjectServiceClient;

  onModuleInit(): void {
    this.projectService = this.client.getService<ProjectServiceClient>('ProjectService');
  }

  async create(data:CreateRequest):Promise<CreateResponse> {
    const createdTeam:Team|any = await this.teamModel.create(data);
    if (!createdTeam) return this.handleValidationError({res:{msg:"team creation failed"}}, {context:"create"});
    return this.handleSuccessResponse({res:{msg:"team created"}, id: createdTeam._id.toString(),}, {context:"create"});
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    const updatedTeam = await this.teamModel.findByIdAndUpdate(
      data.id,
      { ...data.team },
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
      team: {...foundTeam, id: foundTeam._id.toString()},
    }, {context:"findOneById"});
  }
  
  async findByUserId(data: FindByUserIdRequest): Promise<FindByUserIdResponse> {
    const teams = await this.teamModel.find({ members: data.userId }).lean();
    if (!teams.length) return this.handleValidationError({res:{msg:"teams not found"}}, {context:"findByUserId"});
    
    return this.handleSuccessResponse({
        res:{msg:"teams found"},
        teams: teams.map(team => {
          return {...team, id: team._id.toString()}
        }),
    }, {context:"findByUserId"});
  }

  async join(data: JoinRequest): Promise<JoinResponse> {
    const updatedTeam = await this.teamModel.findByIdAndUpdate(
      data.id,
      { $addToSet: { members: data.user } },
      { new: true },
    );
    if (!updatedTeam) return this.handleValidationError({ res: { msg: 'team not found' } }, { context: 'join' });

    return this.handleSuccessResponse({ res: { msg: 'user joined team' } }, { context: 'join' });
  }

async leave(data: LeaveRequest): Promise<LeaveResponse> {
  const updatedTeam = await this.teamModel.findByIdAndUpdate(
    data.id,
    { $pull: { members: data.user } },
    { new: true },
  );

  if (!updatedTeam) return this.handleValidationError({ res: { msg: 'team not found' } }, { context: 'leave' });

  return this.handleSuccessResponse({ res: { msg: 'user left team' } }, { context: 'leave' });
}

  handleValidationError(response:any, logData:any, logMsg?:string):any {
    const res = {...response, res:{ok:false, status:"ERROR", ...response.res}};
    this.logger.error({r:res, ...logData }, logMsg || response.res.msg);
    return res;
  }

  handleSuccessResponse(response:any, logData:any, logMsg?:string):any {
    const res = {...response, res:{ok:true, status:"SUCCESS", ...response.res}};
    this.logger.info({response:res, ...logData }, logMsg || response.res.msg);
    return res;
  }
}
