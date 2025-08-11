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
import { gRPC_client } from '@libs/shared/src/grpc/client';


@Injectable()
export class UserService implements OnModuleInit {
  @Client(gRPC_client('team'))
  private client: ClientGrpc;
  private teamService: TeamServiceClient;

  onModuleInit() {
    this.teamService = this.client.getService<TeamServiceClient>('TeamService');
  }

  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserDocument>,
    private readonly logger: PinoLogger,
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    const createdUser:User|any = await this.userModel.create({
      emailConfirmed: false,
      confirmCode: this.generateConfirmCode(),
      ...data
    });
    if (!createdUser) return this.handleValidationError({res:{msg:"user creation failed"}}, {context:"create"});

    return this.handleSuccessResponse({
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

    if (!updatedUser) return this.handleValidationError({res:{msg:"user not found"}}, {context:"update"});

    return this.handleSuccessResponse({res:{msg:"user updated"}}, {context:"update"});
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    const user = await this.userModel.findById(data.id).lean();
    if (!user) return this.handleValidationError({res:{msg:"user not found"}}, {context:"findOneById"});
    
    const teams = data.populateTeams ? await firstValueFrom(this.teamService.findByUserId({ userId: data.id })) : {res:{ok:true}, teams:[]};
    if (!teams.res?.ok) return this.handleValidationError({res:{msg:"teams finding failed"}}, {context:"findOneById"});
    
    return this.handleSuccessResponse({
        res:{msg:"user found"},
        user: {
        ...user,
        teams: teams.teams,
        id: user._id.toString(),
      }}, {context:"findOneById"});
  }
  async findOneByEmail(data:FindOneByEmailRequest):Promise<FindResponse> {
    const user = await this.userModel.findOne({ email: data.email }).lean();
    if (!user) return this.handleValidationError({res:{msg:"user not found"}}, {context:"findOneByEmail"});

    return this.handleSuccessResponse({
      res:{msg:"user found"},
      user: {
        ...user,
        id: user._id.toString(),
      }}, {context:"findOneByEmail"});
  }

  async registerGenWorker(data: RegisterGenWorkerRequest):Promise<RegisterGenWorkerResponse>{
    const context = 'registerGenWorker'

    const user = await this.userModel.findById(data.userId);
    if (!user) return this.handleValidationError({res:{msg:"user not found"}}, {context});
    
    if (!user.genWorkers) user.genWorkers = [];
    user.genWorkers.push(new Types.ObjectId(data.genWorkerId));

    await user.save();

    return this.handleSuccessResponse({res:{msg:"GenWorker registered"}}, {context}); 
  }

  handleValidationError(response:any, logData:any, logMsg?:string):any {
    const res = {...response, res:{ok:false, status:"ERROR", ...response.res}};
    this.logger.error({response:res, ...logData }, logMsg || response.res.msg);
    return res;
  }

  handleSuccessResponse(response:any, logData:any, logMsg?:string):any {
    const res = {...response, res:{ok:true, status:"SUCCESS", ...response.res}};
    this.logger.info({response:res, ...logData }, logMsg || response.res.msg);
    return res;
  }

  generateConfirmCode(){
    return Math.floor(100000 + Math.random() * 900000);
  }
}
