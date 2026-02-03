import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse,
  FindOneByProjectRequest,
} from '@proto/genworker/genworker';
import { Client, type ClientGrpc } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GenWorker as GenWorkerSchema, GenWorkerDocument } from '@shared/schema/genworker.schema';
import { GenWorker } from '@shared/types/GenWorker.type';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { firstValueFrom } from 'rxjs';
import { ProjectServiceClient } from '@proto/project/project.client';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { TeamServiceClient } from '@proto/team/team.client';


@Injectable()
export class GenWorkerService implements OnModuleInit {
  @Client(gRPC_client('project'))
  private projectClient:ClientGrpc;
  private projectService:ProjectServiceClient;

  @Client(gRPC_client('team'))
  private teamClient:ClientGrpc;
  private teamService:TeamServiceClient;

  onModuleInit() {
    this.projectService = this.projectClient.getService<ProjectServiceClient>('ProjectService');
    this.teamService = this.teamClient.getService<TeamServiceClient>('TeamService');
  }

  constructor(
    @InjectModel(GenWorkerSchema.name) private genworkerModel: Model<GenWorkerDocument>,
    private readonly logger: PinoLogger,
    private readonly response: ResponseService
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    const context = 'create';

    const createdGenWorker:GenWorker|any = await this.genworkerModel.create({...data, ownerId: new Types.ObjectId(data.ownerId), isActive: false, projects: []});
    if (!createdGenWorker) return this.response.error({res:{msg:"GenWorker creation failed"}}, {context});

    return this.response.success({res:{msg:"GenWorker created"}, genworker: {...createdGenWorker.genworker, id: createdGenWorker._id.toString()}}, {context});
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    const context = 'update';

    const updatedGenWorker = await this.genworkerModel.findByIdAndUpdate(
      data.id,
      { ...data.genworker },
      { new: true },
    );

    if (!updatedGenWorker) return this.response.error({res:{msg:"GenWorker not found"}}, {context});

    return this.response.success({res:{msg:"GenWorker updated"}}, {context});
  }

  // Team
  async assignToTeam(data) {
    const context = 'assignToFlow';

    const updatedGenWorker = await this.genworkerModel.findByIdAndUpdate(
      data.genworkerId,
      { $addToSet: { assignedTeams: `${data.teamId}` } },
      { new: true },
    );

    if (!updatedGenWorker) return this.response.error({res:{msg:"GenWorker not found"}}, {context});

    await firstValueFrom(this.teamService.assignGenworkerToTeam(data));

    return this.response.success({res:{msg:"GenWorker assigned to team"}}, {context});
  }
  async removeFromTeam(data) {
    const context = 'removeFromTeam';

    const updatedGenWorker = await this.genworkerModel.findByIdAndUpdate(
      data.genworkerId,
      { $pull: { assignedTeams: `${data.teamId}` } },
      { new: true },
    );

    if (!updatedGenWorker) return this.response.error({res:{msg:"GenWorker not found"}}, {context});

    await firstValueFrom(this.teamService.removeGenworkerFromTeam(data));

    return this.response.success({res:{msg:"GenWorker removed from team"}}, {context});
  }
  async teamSetMaster(data) {
    const context = 'teamSetMaster';

    await firstValueFrom(this.teamService.setMasterGenworker(data));

    return this.response.success({res:{msg:"GenWorker set as master"}}, {context});
  }

  async teamAddStorage(data) {
    const context = 'teamAddStorage';

    await firstValueFrom(this.teamService.addStorageGenworker(data));

    return this.response.success({res:{msg:"GenWorker added as storage"}}, {context});
  }

  async teamRemoveStorage(data) {
    const context = 'teamRemoveStorage';

    await firstValueFrom(this.teamService.removeStorageGenworker(data));

    return this.response.success({res:{msg:"GenWorker removed from storage"}}, {context});
  }
  // Project
  async assignToProject(data) {
    const context = 'assignToProject';

    const updatedGenWorker = await this.genworkerModel.findByIdAndUpdate(
      data.genworkerId,
      { $addToSet: { assignedProjects: `${data.projectId}` } },
      { new: true },
    );

    if (!updatedGenWorker) return this.response.error({res:{msg:"GenWorker not found"}}, {context});

    await firstValueFrom(this.projectService.assignGenworkerToProject(data));

    return this.response.success({res:{msg:"GenWorker assigned to project"}}, {context});
  }

  async assignToFlow(data) {
    const context = 'assignToFlow';

    const path = data.path=="//" ? "/" : data.path;

    const updatedGenWorker = await this.genworkerModel.findByIdAndUpdate(
      data.genworkerId,
      { $addToSet: { assignedFlows: `${data.projectId}:${path}${data.flowName}` } },
      { new: true },
    );

    if (!updatedGenWorker) return this.response.error({res:{msg:"GenWorker not found"}}, {context});

    await firstValueFrom(this.projectService.assignGenworkerToFlow(data));

    return this.response.success({res:{msg:"GenWorker assigned to flow"}}, {context});
  }
  async findByIds(data){
    const context = 'findByIds';

    const genworkers = await Promise.all(data.genworkerIds.map(async (id:string)=>{
      const [ownerId, name] = id.split(':');
      const genworker = await this.genworkerModel.find({ownerId, name}).lean();
      return genworker;
    }))
    if (!genworkers) return this.response.fail({res:{msg:"GenWorkers not found"}}, {context});

    return this.response.success({
      res:{msg:"GenWorker found"},
      genworkers: genworkers[0],
    }, {context});
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    const context = 'findOneById';
    let genworker:GenWorker|any;

    if(data.id.includes(':')){
      const [ownerId, name] = data.id.split(':');
      genworker = await this.genworkerModel.findOne({ownerId, name}).lean();
    } else genworker = await this.genworkerModel.findById(data.id).lean();

    if (!genworker) return this.response.fail({res:{msg:"GenWorker not found"}}, {context});
    
    return this.response.success({
        res:{msg:"GenWorker found"},
        genworker: {
        ...genworker,
        id: genworker._id.toString(),
      }}, {context});
  }

  async findOneByProject(data:FindOneByProjectRequest):Promise<FindResponse> {
    const context = 'findOneByProject';

    const genworker = await this.genworkerModel.findOne({ projectId: data.projectId, path: data.flowPath, name: data.flowName }).lean();
    if (!genworker) return this.response.fail({res:{msg:"GenWorker not found"}}, {context});
    
    return this.response.success({
        res:{msg:"GenWorker found"},
        genworker: {
        ...genworker,
        id: genworker._id.toString(),
      }}, {context});
  }

  async findOneByName(data){
    const context = 'findOneByName';

    const genworker = await this.genworkerModel.findOne({ name: data.name }).lean();
    if (!genworker) return this.response.fail({res:{msg:"GenWorker not found"}}, {context});
    
    return this.response.success({
        res:{msg:"GenWorker found"},
        genworker: {
        ...genworker,
        id: genworker._id.toString(),
      }}, {context});
  }
}
