import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse,
  RegisterRequest,

} from '@proto/genworker/genworker';
import { PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GenWorker as GenWorkerSchema, GenWorkerDocument } from '@shared/schema/genworker.schema';
import { GenWorker } from '@shared/types/GenWorker.type';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { services_config } from '@libs/shared/src/services_config';
import { firstValueFrom } from 'rxjs';
import { UserServiceClient } from '@proto/user/user.client';


@Injectable()
export class GenWorkerService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: require.resolve('@proto/user/user.proto'),
      url: services_config.service_url.user_rpc,
    },
  })
  private userClient:ClientGrpc;
  private userService:UserServiceClient;
  
  onModuleInit() {
    this.userService = this.userClient.getService<UserServiceClient>('UserService');
  }

  constructor(
    @InjectModel(GenWorkerSchema.name) private genworkerModel: Model<GenWorkerDocument>,
    private readonly logger: PinoLogger,
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    const context = 'create';

    const createdGenWorker:GenWorker|any = await this.genworkerModel.create({...data, owner: new Types.ObjectId(data.ownerId), isActive: true});
    if (!createdGenWorker) return this.handleValidationError({res:{msg:"GenWorker creation failed"}}, {context});

    return this.handleSuccessResponse({res:{msg:"GenWorker created"}, genworker: {...createdGenWorker.genworker, id: createdGenWorker._id.toString()}}, {context});
  }
  async update(data:UpdateRequest):Promise<UpdateResponse> {
    const context = 'update';

    const updatedGenWorker = await this.genworkerModel.findByIdAndUpdate(
      data.id,
      { ...data.genworker },
      { new: true },
    );

    if (!updatedGenWorker) return this.handleValidationError({res:{msg:"GenWorker not found"}}, {context});

    return this.handleSuccessResponse({res:{msg:"GenWorker updated"}}, {context});
  }
  async findOneById(data:FindOneByIdRequest):Promise<FindResponse> {
    const context = 'findOneById';

    const genworker = await this.genworkerModel.findById(data.id).lean();
    if (!genworker) return this.handleValidationError({res:{msg:"GenWorker not found"}}, {context});
    
    return this.handleSuccessResponse({
        res:{msg:"GenWorker found"},
        genworker: {
        ...genworker,
        id: genworker._id.toString(),
      }}, {context});
  }

  async findOneByName(data){
    const context = 'findOneByName';

    const genworker = await this.genworkerModel.findOne({ name: data.name }).lean();
    if (!genworker) return this.handleValidationError({res:{msg:"GenWorker not found"}}, {context});
    
    return this.handleSuccessResponse({
        res:{msg:"GenWorker found"},
        genworker: {
        ...genworker,
        id: genworker._id.toString(),
      }}, {context});
  }

  async setActive(id: string, active: boolean) {
  const context = 'setActive';

  const doc = await this.genworkerModel.findByIdAndUpdate(
    id,
    { active },
    { new: true, lean: true }
  );

  if (!doc) return this.handleValidationError({ res: { msg: 'GenWorker not found' } },{ context });
  
  const { _id, ...rest } = doc as any;
  return this.handleSuccessResponse(
    {
      res: { msg: `GenWorker ${active ? 'activated' : 'deactivated'}` },
      genworker: { ...rest, id: _id.toString() },
    },
    { context }
  );
}

  async register(data: RegisterRequest){
    const context = 'register';

    const foundGenWorker = await this.findOneByName({ name: data.name });
    if (foundGenWorker.res.ok) {
      this.setActive(foundGenWorker.genworker.id, true);
      return this.handleSuccessResponse({res:{msg:"GenWorker registered"}}, {context});
    }

    const genworker = await this.create(data);
    if (!genworker || !genworker.genworker) return this.handleValidationError({res:{msg:"GenWorker registration failed"}}, {context});

    await firstValueFrom(this.userService.registerGenWorker({genWorkerId: genworker.genworker?.id, userId: data.ownerId}));

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
}
