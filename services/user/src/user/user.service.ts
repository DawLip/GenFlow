import { Injectable } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByEmailRequest, FindOneByIdRequest, FindResponse
} from '@proto/user/user';
import * as jwt from 'jsonwebtoken';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserSchema, UserDocument } from '@shared/schema/user.shema';
import { User } from '@shared/types/User.type'


@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserDocument>,
    private readonly logger: PinoLogger,
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    const createdUser:User|any = await this.userModel.create(data);
    this.logger.info({input: data, user: createdUser, context:"create"}, "User created")
    return {
      id: createdUser._id.toString(),
      status: "SUCCESS",
      msg: "User created",
    };
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      data.id,
      { ...data },
      { new: true },
    );

    if (!updatedUser) {
      this.logger.warn({input: data, user: updatedUser, context:"update"}, "User not found")
      return { status: 'ERROR', msg: 'User not found' };
    }

    this.logger.info({input: data, user: updatedUser, context:"update"}, "User created")
    return {
      status: 'SUCCESS',
      msg: 'User updated',
    };
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    const user = await this.userModel.findById(data.id).lean();

    if (!user) {
      this.logger.warn({input: data, user: user, context:"findOneById"}, "User not found")
      return {
        status: 'ERROR',
        msg: 'User not found',
      };
    }

    this.logger.info({input: data, user: user, context:"findOneById"}, "User found")
    return {
      status: 'SUCCESS',
      msg: 'User found',
      user: {
        ...user,
        id: user._id.toString(),
      },
    };
  }
  async findOneByEmail(data:FindOneByEmailRequest):Promise<FindResponse> {
    const user = await this.userModel.findOne({ email: data.email }).lean();

    if (!user) {
      this.logger.warn({input: data, user: user, context:"findOneByEmail"}, "User not found")
      return {
        status: 'ERROR',
        msg: 'User not found',
      };
    }

    return this.handleSuccessResponse(
      {
        res:{msg:"user found"},
        user: {
          ...user,
          id: user._id.toString(),
        }
      }, {context:"findOneByEmail"});
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
}
