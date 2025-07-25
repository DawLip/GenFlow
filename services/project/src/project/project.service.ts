import { Injectable } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse,
  CreateFlowRequest,
  CreateFlowResponse,
  UpdateFlowRequest,
  UpdateFlowResponse
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
    const createdProject:Project|any = await this.projectModel.create({
      flows:[],
      ...data
    });
    return this.handleSuccessResponse({res:{msg:"project created"}, id: createdProject._id.toString(),}, {context:"create"});
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      data.id,
      { ...data },
      { new: true },
    );

    if (!updatedProject) return this.handleValidationError({res:{msg:"project not found"},}, {context:"update"});

    return this.handleSuccessResponse({res:{msg:"project updated"}}, {context:"update"});
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    const foundProject = await this.projectModel.findById(data.id).lean();

    if (!foundProject) return this.handleValidationError({res:{msg:"project not found"}}, {context:"findOneById"});

    return this.handleSuccessResponse({
      res:{msg:"project found"},
      project: { ...foundProject, id: foundProject._id.toString()}
    }, {context:"findOneById"});
  }

  async createFlow(data:CreateFlowRequest):Promise<CreateFlowResponse> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      data.id,
      { $addToSet: { flows: data.flow } },
      { new: true },
    );

  if (!updatedProject) return this.handleValidationError({ res: { msg: 'project not found' } }, { context: 'createFlow' });

  return this.handleSuccessResponse({ res: { msg: 'flow created' } }, { context: 'createFlow' });
  }
  async updateFlow(data:UpdateFlowRequest):Promise<UpdateFlowResponse> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      data.id,
      {$set: {[`flows.$[elem].${data.field}`]: data.value}},
      {new: true, arrayFilters: [{ 'elem.name': data.flowName }]},
    );
    if (!updatedProject) return this.handleValidationError({res:{msg:"project not found"},}, {context:"updateFlow", data});

    return this.handleSuccessResponse({res:{msg:"flow updated"}}, {context:"updateFlow"});
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
