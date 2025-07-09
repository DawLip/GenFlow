import { Injectable } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse
} from '@proto/project/project';
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
    const createdProject:Project|any = await this.projectModel.create(data);
    this.logger.info({input: data, user: createdProject, context:"create"}, "Project created")
    return {
      id: createdProject._id.toString(),
      status: "SUCCESS",
      msg: "Project created",
    };
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      data.id,
      { ...data },
      { new: true },
    );

    if (!updatedProject) {
      this.logger.warn({input: data, user: updatedProject, context:"update"}, "Project not found")
      return { status: 'ERROR', msg: 'Project not found' };
    }

    this.logger.info({input: data, user: updatedProject, context:"update"}, "Project created")
    return {
      status: 'SUCCESS',
      msg: 'Project updated',
    };
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    const foundProject = await this.projectModel.findById(data.id).lean();

    if (!foundProject) {
      this.logger.warn({input: data, foundProject: foundProject, context:"findOneById"}, "Project not found")
      return {
        status: 'ERROR',
        msg: 'Project not found',
      };
    }

    this.logger.info({input: data, foundProject: foundProject, context:"findOneById"}, "Project found")
    return {
      status: 'SUCCESS',
      msg: 'Project found',
      project: {
        ...foundProject,
        id: foundProject._id.toString(),
      },
    };
  }
}
