import { Injectable } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByEmailRequest, FindOneByIdRequest, FindResponse
} from '@proto/lib/project';
import * as jwt from 'jsonwebtoken';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project as ProjectSchema, ProjectDocument } from '@shared/schema/project.shema';
import { Project } from '@shared/types/Project.type'


@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(ProjectSchema.name) private projectModel: Model<ProjectDocument>,
    private readonly logger: PinoLogger,
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    // const createdUser:User|any = await this.userModel.create(data);
    // this.logger.info({input: data, user: createdUser, context:"create"}, "User created")
    // return {
    //   id: createdUser._id.toString(),
    //   status: "SUCCESS",
    //   msg: "User created",
    // };
    return {
      id: "000",
      status: "SUCCESS",
      msg: "Project created",
    };
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    // const updatedUser = await this.userModel.findByIdAndUpdate(
    //   data.id,
    //   { ...data },
    //   { new: true },
    // );

    // if (!updatedUser) {
    //   this.logger.warn({input: data, user: updatedUser, context:"update"}, "User not found")
    //   return { status: 'ERROR', msg: 'User not found' };
    // }

    // this.logger.info({input: data, user: updatedUser, context:"update"}, "User created")
    return {
      status: 'SUCCESS',
      msg: 'Project updated',
    };
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    // const user = await this.userModel.findById(data.id).lean();

    // if (!user) {
    //   this.logger.warn({input: data, user: user, context:"findOneById"}, "User not found")
    //   return {
    //     status: 'ERROR',
    //     msg: 'User not found',
    //   };
    // }

    // this.logger.info({input: data, user: user, context:"findOneById"}, "User found")
    return {
      status: 'SUCCESS',
      msg: 'Project found',
      project: {

      },
    };
  }
}
