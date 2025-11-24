import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse,
  JoinRequest,
  JoinResponse,
  LeaveRequest,
  LeaveResponse,
  FindByUserIdRequest,
  FindByUserIdResponse,
  DefaultResponse,
  InviteRequest
} from '@proto/team/team';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Team as TeamSchema, TeamDocument } from '@shared/schema/team.shema';
import { Team } from '@shared/types/Team.type'
import { connectable, firstValueFrom } from 'rxjs';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { services_config } from '@shared/services_config';
import { ProjectServiceClient } from '@proto/project/project.client';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { UserServiceClient } from '@proto/user/user.client';


@Injectable()
export class TeamService {
  constructor(
    @InjectModel(TeamSchema.name) private teamModel: Model<TeamDocument>,
    private readonly logger: PinoLogger,
    private readonly response: ResponseService,
    @Inject('EMAIL_CLIENT') private readonly emailClient: ClientProxy
  ) {}

  @Client(gRPC_client('user'))
  private userClient: ClientGrpc;
  private userService: UserServiceClient;

  onModuleInit(): void {
    this.userService = this.userClient.getService<UserServiceClient>('UserService');
  }

  async create(data:CreateRequest):Promise<CreateResponse> {
    const createdTeam:Team|any = await this.teamModel.create({
      master_genworker: null,
      storage_genworkers: [],
      genworkers: [],
      ...data
    });
    if (!createdTeam) return this.response.error({res:{msg:"team creation failed"}}, {context:"create"});
    return this.response.success({res:{msg:"team created"}, id: createdTeam._id.toString(),}, {context:"create"});
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    const updatedTeam = await this.teamModel.findByIdAndUpdate(
      data.id,
      { ...data.team },
      { new: true },
    );

    if (!updatedTeam) return this.response.fail({res:{msg:"team not found"},}, {context:"update"});

    return this.response.success({res:{msg:"team updated"}}, {context:"update"});
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    const foundTeam = await this.teamModel.findById(data.id).lean();

    if (!foundTeam) return this.response.fail({res:{msg:"team not found"},}, {context:"findOneById"});

    return this.response.success({
      res:{msg:"team found"},
      team: {...foundTeam, id: foundTeam._id.toString()},
    }, {context:"findOneById"});
  }
  
  async findByUserId(data: FindByUserIdRequest): Promise<FindByUserIdResponse> {
    const teams = await this.teamModel.find({ members: data.userId }).lean();
    if (!teams.length) return this.response.fail({res:{msg:"teams not found"}}, {context:"findByUserId"});
    const teamsToReturn = teams.map(team => ({...team, id: team._id.toString(), storageGenworkers: team.storage_genworkers, masterGenworker: team.master_genworker}));
    
    return this.response.success({
      res:{msg:"teams found"},
      teams: teamsToReturn
    }, {context:"findByUserId"});
  }

  async invite(data: InviteRequest): Promise<DefaultResponse> {
    const user = await firstValueFrom(this.userService.findOneByEmail({ email: data.user }));
    console.log('Inviting user:', user, data.id);
    const updatedTeam = await this.teamModel.findByIdAndUpdate(
      data.id,
      { $addToSet: { invited: user.user?.id } },
      { new: true },
    );
    if (!updatedTeam) return this.response.fail({ res: { msg: 'team not found' } }, { context: 'invite' });


    this.emailClient.emit('send_email', {
      to: user.user?.email,
      subject: "Invitation Email",
      body: `You have been invited to join the team: ${updatedTeam.name}, folow link to accept the invitation: http://localhost:3000/accept-team-invitation/${updatedTeam._id}`,
      from: 'noreply@example.com',
    }).subscribe();

    return this.response.success({ res: { msg: 'user invited to team' } }, { context: 'invite' });
  }

  async join(data: JoinRequest): Promise<JoinResponse> {
    const updatedTeam = await this.teamModel.findById(data.id);
    if (!updatedTeam) return this.response.fail({ res: { msg: 'team not found' } }, { context: 'join' });

    if (!updatedTeam.invited.includes(new Types.ObjectId(data.user))) return this.response.fail({ res: { msg: 'user not invited to team' } }, { context: 'join' });
    
    updatedTeam.members.push(new Types.ObjectId(data.user));
    updatedTeam.invited = updatedTeam.invited.filter(userId => userId.toString() !== data.user);
    await updatedTeam.save();

    return this.response.success({ res: { msg: 'user joined team' } }, { context: 'join' });
  }

  async leave(data: LeaveRequest): Promise<LeaveResponse> {
    const updatedTeam = await this.teamModel.findByIdAndUpdate(
      data.id,
      { $pull: { members: data.user } },
      { new: true },
    );

    if (!updatedTeam) return this.response.fail({ res: { msg: 'team not found' } }, { context: 'leave' });

    return this.response.success({ res: { msg: 'user left team' } }, { context: 'leave' });
  }

  async assignGenworkerToTeam(data){ 
    data.path = data.path=="//" ? "/" : data.path;
    const team = await this.teamModel.findById(data.teamId);
    if (!team) return this.response.fail({res:{msg:"team not found"}}, {context:"assignGenworker", data});
    
    if(!team?.genworkers) team.genworkers = [];

    if(!team.genworkers.includes(data.genworkerId)) team.genworkers.push(data.genworkerId);
    await team?.save();

    return this.response.success({res:{msg:"worker assigned to team"}}, {});
  }
  async removeGenworkerFromTeam(data){ 
    const team = await this.teamModel.findById(data.teamId);
    if (!team) return this.response.fail({res:{msg:"team not found"}}, {context:"removeGenworkerFromTeam", data});
    
    if(!team?.genworkers) team.genworkers = [];

    team.genworkers = team.genworkers.filter(gwId => gwId.toString() !== data.genworkerId);
    if(team.master_genworker === data.genworkerId) team.master_genworker = null;
    team.storage_genworkers = team.storage_genworkers.filter(gwId => gwId.toString() !== data.genworkerId);

    await team?.save();

    return this.response.success({res:{msg:"worker removed from team"}}, {});
  }
  async setMasterGenworker(data){ 
    const team = await this.teamModel.findById(data.teamId);
    if (!team) return this.response.fail({res:{msg:"team not found"}}, {context:"setMasterGenworker", data});
    
    team.master_genworker = data.genworkerId;
    await team?.save();

    return this.response.success({res:{msg:"master genworker set"}}, {});
  }
  async addStorageGenworker(data){ 
    const team = await this.teamModel.findById(data.teamId);
    if (!team) return this.response.fail({res:{msg:"team not found"}}, {context:"addStorageGenworker", data});
    
    if(!team?.storage_genworkers) team.storage_genworkers = [];

    team.storage_genworkers.push(data.genworkerId);
    await team?.save();

    return this.response.success({res:{msg:"storage genworker added"}}, {});
  }
  async removeStorageGenworker(data){ 
    console.log("Removing genworker from team storage:", data);
    const team = await this.teamModel.findById(data.teamId);
    if (!team) return this.response.fail({res:{msg:"team not found"}}, {context:"removeStorageGenworker", data});
    
    if(!team?.storage_genworkers) team.storage_genworkers = [];

    team.storage_genworkers = team.storage_genworkers.filter(gwId => gwId.toString() !== data.genworkerId);
    await team?.save();

    return this.response.success({res:{msg:"storage genworker removed"}}, {});
  }
}
