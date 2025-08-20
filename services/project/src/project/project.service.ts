import { Injectable } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, 
  UpdateRequest, UpdateResponse, 
  FindOneByIdRequest, FindResponse,
  CreateFlowRequest, CreateFlowResponse,
  UpdateFlowRequest, UpdateFlowResponse,
  FindFlowResponse, FindOneByNameFlowRequest,
  FindByTeamIdRequest,
  FindByTeamIdResponse,
  UpdateFlowDataResponse,
  UpdateFlowDataRequest
} from '@proto/project/project';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project as ProjectSchema, ProjectDocument } from '@shared/schema/project.shema';
import { Project } from '@shared/types/Project.type'
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';


@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(ProjectSchema.name) private projectModel: Model<ProjectDocument>,
    private readonly logger: PinoLogger,
    private readonly response: ResponseService
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    const createdProject:Project|any = await this.projectModel.create({
      flows:[],
      ...data
    });
    return this.response.success({res:{msg:"project created"}, id: createdProject._id.toString(),}, {context:"create"});
  }

  async update(data:UpdateRequest):Promise<UpdateResponse> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      data.id,
      { ...data.project },
      { new: true },
    );

    if (!updatedProject) return this.response.fail({res:{msg:"project not found"},}, {context:"update"});

    return this.response.success({res:{msg:"project updated"}}, {context:"update"});
  }

  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    const foundProject = await this.projectModel.findById(data.id).lean();

    if (!foundProject) return this.response.fail({res:{msg:"project not found"}}, {context:"findOneById"});

    return this.response.success({
      res:{msg:"project found"},
      project: { 
        ...foundProject, 
        id: foundProject._id.toString(), 
        flows: foundProject.flows.map(flow => ({...flow, data: undefined})) 
      }
    }, {context:"findOneById"});
  }

  async findByTeamId(data:FindByTeamIdRequest):Promise<FindByTeamIdResponse> {
    const foundProjects = await this.projectModel.find({ team: data.id }).lean();

    if (!foundProjects) return this.response.fail({res:{msg:"projects not found"}}, {context:"findByTeamId"});

    return this.response.success({
      res:{msg:"projects found"},
      projects: foundProjects.map(project => ({ ...project, id: project._id.toString() }))
    }, {context:"findByTeamId"});
  }


  async findOneByNameFlow(data:FindOneByNameFlowRequest):Promise<FindFlowResponse> {
    const foundProject = await this.projectModel.findById(data.id).lean();
    if (!foundProject) return this.response.fail({res:{msg:"project not found"}}, {context:"findOneByNameFlow"});

    const flow = foundProject.flows.filter(flow=>flow.name==data.flowName)
    if (!flow.length) return this.response.fail({res:{msg:"flow not found"}}, {context:"findOneByNameFLow"});

    return this.response.success({
      res:{msg:"flow found"},
      flow: { 
        ...flow[0],
        nodes: flow[0]?.nodes.map((node:any)=>({
          ...node,
          position: JSON.stringify(node.position),
          style: JSON.stringify(node.style),
          data: JSON.stringify(node.data)
        }))
      } 
    }, {context:"findOneByNameFlow"});
  }

  async createFlow(data:CreateFlowRequest):Promise<CreateFlowResponse> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      data.id,
      { $addToSet: { flows: { ...data.flow } } },
      { new: true },
    );

    if (!updatedProject) return this.response.fail({ res: { msg: 'project not found' } }, { context: 'createFlow' });

    return this.response.success({ res: { msg: 'flow created' }, flow: { ...data.flow } }, { context: 'createFlow' });
  }

  async updateFlow(data: UpdateFlowRequest): Promise<UpdateFlowResponse> {
    if (!data.id) return this.response.validationFail({res:{msg:"Field 'id' is required"}}, {context:"updateFlow"});
    if (!data.flow) return this.response.validationFail({res:{msg:"Field 'flow' is required"}}, {context:"updateFlow"});
    if (!data.flowName) return this.response.validationFail({res:{msg:"Field 'flowName' is required"}}, {context:"updateFlow"});

    const project = await this.projectModel.findById(data.id);
    if (!project) return this.response.fail({res:{msg:"project not found"}}, {context:"updateFlow", data});

    const flowIndex = project.flows.findIndex(flow => flow.name === data.flowName);
    if (flowIndex === -1) return this.response.fail({res:{msg:"flow not found"}}, {context:"updateFlow", data});

    const updatedProject = await this.projectModel.findByIdAndUpdate(
      data.id,
      {$set: {[`flows.${flowIndex}`]: {...project.flows[flowIndex], ...data.flow}}},
      {new: true}
    );

    if (!updatedProject) return this.response.fail({res:{msg:"failed to update flow"}}, {context:"updateFlow", data});

    return this.response.success({res:{msg:"flow updated"}}, {context:"updateFlow"});
  }

  async updateFlowData(data: UpdateFlowDataRequest): Promise<UpdateFlowDataResponse> {
    const context = 'updateFlowData';

    if (!data.operation) return this.response.validationFail({res:{msg:"Field 'operation' is required"}}, {context});
    if (!data.id) return this.response.validationFail({res:{msg:"Field 'id' is required"}}, {context});
    if (!data.flowName) return this.response.validationFail({res:{msg:"Field 'flowName' is required"}}, {context});
    if (!data.data) return this.response.validationFail({res:{msg:"Field 'data' is required"}}, {context});

    const project = await this.projectModel.findById(data.id);
    if (!project) return this.response.fail({res:{msg:"project not found"}}, {context, data});

    const flowIndex = project.flows.findIndex(flow => flow.name === data.flowName);
    if (flowIndex === -1) return this.response.fail({res:{msg:"flow not found"}}, {context, data});

    switch(data.operation){
      case 'addNode': this.addNode(project, flowIndex, data.data); break;
      case 'onNodesChange': this.onNodesChange(project, flowIndex, data.data); break;
      case 'onConnect':  this.onConnect(project, flowIndex, data.data); break;
      case 'onEdgesChange': this.onEdgesChange(project, flowIndex, data.data); break;
    }

    return this.response.success({res:{msg:"flow updated"}}, {context});
  }

  async addNode(project:any, flowIndex:number, data:any){
    const flow = project.flows[flowIndex];

    if (!Array.isArray(flow.nodes)) flow.nodes = [];
    flow.nodes.push(data);

    await project.save();
  }

  async onNodesChange(project:any, flowIndex:number, data:any){
    const flow = project.flows[flowIndex];

    const node = flow.nodes.find((node:any) => node.id === data.changes[0].id);

    switch(data.changes[0].type){
      case 'position': node.position = data.changes[0].position; break;
    }

    await project.save();
  }

  async onConnect(project:any, flowIndex:number, data:any){
    const flow = project.flows[flowIndex];
    flow.edges.push({id: `xy-edge__${data.params.source}-${data.params.target}`, ...data.params});
    await project.save();
  }

  async onEdgesChange(project:any, flowIndex:number, data:any){
    const flow = project.flows[flowIndex];
    const edgeIndex = flow.edges.findIndex((edge:any) => edge.id === data.changes[0].id);
    if (edgeIndex !== -1) {
      switch(data.changes[0].type){
        case 'remove': flow.edges.splice(edgeIndex, 1); break;
        case 'update': flow.edges[edgeIndex] = {...flow.edges[edgeIndex], ...data.changes[0].data}; break;
      }
      await project.save();
    }
  }
}
