import { Injectable } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByEmailRequest, FindOneByIdRequest, FindResponse
} from '@proto/lib/user';import * as jwt from 'jsonwebtoken';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserSchema, UserDocument } from '@shared/schema/user.shema';
import { User } from '@shared/types/User.type'


@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserDocument>,
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    const createdUser:User|any = await this.userModel.create(data);
    return {
      id: createdUser._id.toString(),
      status: "success",
      msg: "User created",
    };
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    return { status: "", msg: "" };
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    return { status: "", msg: "" };
  }
  async findOneByEmail(data:FindOneByEmailRequest):Promise<FindResponse> {
    return { status: "", msg: "" };
  }
}
