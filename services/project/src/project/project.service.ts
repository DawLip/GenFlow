import { Injectable } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, 
  UpdateRequest, UpdateResponse, 
  FindOneByIdRequest, FindResponse,
  CreateFlowRequest, CreateFlowResponse,
  UpdateFlowRequest, UpdateFlowResponse,
  FindFlowResponse, FindOneByNameFlowRequest,
  FindByTeamIdRequest,
  FindByTeamIdResponse
} from '@proto/project/project';
import * as jwt from 'jsonwebtoken';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project as ProjectSchema, ProjectDocument } from '@shared/schema/project.shema';
import { Project } from '@shared/types/Project.type'
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';


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
      { ...data.project },
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

  async findByTeamId(data:FindByTeamIdRequest):Promise<FindByTeamIdResponse> {
    const foundProjects = await this.projectModel.find({ team: data.id }).lean();

    if (!foundProjects) return this.handleValidationError({res:{msg:"projects not found"}}, {context:"findByTeamId"});
    
    return this.handleSuccessResponse({
      res:{msg:"projects found"},
      projects: foundProjects.map(project => ({ ...project, id: project._id.toString() }))
    }, {context:"findByTeamId"});
  }


  async findOneByNameFlow(data:FindOneByNameFlowRequest):Promise<FindFlowResponse> {
    const foundProject = await this.projectModel.findById(data.id).lean();
    if (!foundProject) return this.handleValidationError({res:{msg:"project not found"}}, {context:"findOneByNameFlow"});
    
    const flow = foundProject.flows.filter(flow=>flow.name==data.flowName)
    if (!flow.length) return this.handleValidationError({res:{msg:"flow not found"}}, {context:"findOneByNameFLow"});


    return this.handleSuccessResponse({
      res:{msg:"flow found"},
      flow: { ...flow[0]}
    }, {context:"findOneByNameFlow"});
  }

  async createFlow(data:CreateFlowRequest):Promise<CreateFlowResponse> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      data.id,
      { $addToSet: { flows: { ...data.flow, flowData: data.flow?.flowData } } },
      { new: true },
    );

    if (!updatedProject) return this.handleValidationError({ res: { msg: 'project not found' } }, { context: 'createFlow' });

    return this.handleSuccessResponse({ res: { msg: 'flow created' }, flow: { ...data.flow } }, { context: 'createFlow' });
  }

  async updateFlow(data: UpdateFlowRequest): Promise<UpdateFlowResponse> {
    if (!data.id) return this.handleValidationError({res:{msg:"Field 'id' is required"}}, {context:"updateFlow"});
    if (!data.flow) return this.handleValidationError({res:{msg:"Field 'flow' is required"}}, {context:"updateFlow"});
    if (!data.flowName) return this.handleValidationError({res:{msg:"Field 'flowName' is required"}}, {context:"updateFlow"});

    const project = await this.projectModel.findById(data.id);
    if (!project) return this.handleValidationError({res:{msg:"project not found"}}, {context:"updateFlow", data});

    const flowIndex = project.flows.findIndex(flow => flow.name === data.flowName);
    if (flowIndex === -1) return this.handleValidationError({res:{msg:"flow not found"}}, {context:"updateFlow", data});

    const updatedProject = await this.projectModel.findByIdAndUpdate(
      data.id,
      {$set: {[`flows.${flowIndex}`]: {...project.flows[flowIndex], ...data.flow}}},
      {new: true}
    );

    if (!updatedProject) return this.handleValidationError({res:{msg:"failed to update flow"}}, {context:"updateFlow", data});

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
