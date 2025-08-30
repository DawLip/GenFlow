import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse,
} from '@proto/genworker/genworker';
import { PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GenWorker as GenWorkerSchema, GenWorkerDocument } from '@shared/schema/genworker.schema';
import { GenWorker } from '@shared/types/GenWorker.type';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';


@Injectable()
export class GenWorkerService implements OnModuleInit {
  onModuleInit() {}

  constructor(
    @InjectModel(GenWorkerSchema.name) private genworkerModel: Model<GenWorkerDocument>,
    private readonly logger: PinoLogger,
    private readonly response: ResponseService
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    const context = 'create';

    console.log(context, data)

    const createdGenWorker:GenWorker|any = await this.genworkerModel.create({...data, ownerId: new Types.ObjectId(data.ownerId), isActive: false, projects: []});
    console.log(context, createdGenWorker);
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
  async assignToFlow(data) {
    const context = 'assignToFlow';

    const updatedGenWorker = await this.genworkerModel.findByIdAndUpdate(
      data.genworkerId,
      { $addToSet: { projects: `${data.projectId}:${data.flowName}` } }, 
      { new: true },
    );

    if (!updatedGenWorker) return this.response.error({res:{msg:"GenWorker not found"}}, {context});

    return this.response.success({res:{msg:"GenWorker assigned to flow"}}, {context});
  }
  async findByIds(data){
    const context = 'findByIds';
    console.log('findByIds')

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

    const genworker = await this.genworkerModel.findById(data.id).lean();
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
