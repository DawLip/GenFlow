import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByEmailRequest, FindOneByIdRequest, FindResponse,
  RegisterGenWorkerRequest,
  RegisterGenWorkerResponse
} from '@proto/user/user';
import * as jwt from 'jsonwebtoken';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User as UserSchema, UserDocument } from '@shared/schema/user.shema';
import { User } from '@shared/types/User.type'
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { services_config } from '@libs/shared/src/services_config';
import { TeamServiceClient } from '@proto/team/team.client';
import { firstValueFrom } from 'rxjs';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { GenWorkerServiceClient } from '@proto/genworker/genworker.client';


@Injectable()
export class UserService implements OnModuleInit {
  @Client(gRPC_client('team'))
  private client: ClientGrpc;
  private teamService: TeamServiceClient;

  @Client(gRPC_client('genworker'))
  private genworkerClient: ClientGrpc;
  private genworkerService: GenWorkerServiceClient;

  onModuleInit() {
    this.teamService = this.client.getService<TeamServiceClient>('TeamService');
    this.genworkerService = this.genworkerClient.getService<GenWorkerServiceClient>('GenWorkerService');
  }

  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserDocument>,
    private readonly logger: PinoLogger,
    private readonly response: ResponseService
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    const createdUser:User|any = await this.userModel.create({
      emailConfirmed: false,
      confirmCode: this.generateConfirmCode(),
      ...data
    });
    if (!createdUser) return this.response.error({res:{msg:"user creation failed"}}, {context:"create"});

    return this.response.success({
        res:{msg:"user created"},
        user: {
          emailConfirmed: createdUser.emailConfirmed,
          confirmCode: createdUser.confirmCode,
          email: createdUser.email,
          username: createdUser.username,
          id: createdUser._id.toString(),
      }}, {context:"create"});
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      data.id,
      { ...data.user },
      { new: true },
    );

    if (!updatedUser) return this.response.fail({res:{msg:"user not found"}}, {context:"update"});

    return this.response.success({res:{msg:"user updated"}}, {context:"update"});
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    const user = await this.userModel.findById(data.id).lean();
    if (!user) return this.response.fail({res:{msg:"user not found"}}, {context:"findOneById"});

    const teams = data.populateTeams ? await firstValueFrom(this.teamService.findByUserId({ userId: data.id })) : {res:{ok:true}, teams:[]};
    if (!teams.res?.ok) return this.response.fail({res:{msg:"teams finding failed"}}, {context:"findOneById"});

    const genworkers = (await Promise.all(
      user.genWorkers.map(
        async (genworker) => await firstValueFrom(this.genworkerService.findOneById({ id: genworker.toString() })))
      )
    ).map((genworker)=>genworker.genworker);

    return this.response.success({
        res:{msg:"user found"},
        user: {
        ...user,
        teams: teams.teams,
        genWorkers: genworkers,
        id: user._id.toString(),
      }}, {context:"findOneById"});
  }
  async findOneByEmail(data:FindOneByEmailRequest):Promise<FindResponse> {
    const user = await this.userModel.findOne({ email: data.email }).lean();
    if (!user) return this.response.fail({res:{msg:"user not found"}}, {context:"findOneByEmail"});

    return this.response.success({
      res:{msg:"user found"},
      user: {
        ...user,
        id: user._id.toString(),
      }}, {context:"findOneByEmail"});
  }

  async registerGenWorker(data: RegisterGenWorkerRequest):Promise<RegisterGenWorkerResponse>{
    const context = 'registerGenWorker'

    const user = await this.userModel.findById(data.userId);
    if (!user) return this.response.fail({res:{msg:"user not found"}}, {context});

    if (!user.genWorkers) user.genWorkers = [];
    user.genWorkers.push(new Types.ObjectId(data.genWorkerId));

    await user.save();

    return this.response.success({res:{msg:"GenWorker registered"}}, {context}); 
  }

  generateConfirmCode(){
    return Math.floor(100000 + Math.random() * 900000);
  }
}
