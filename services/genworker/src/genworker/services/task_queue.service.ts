import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, type ClientGrpc } from '@nestjs/microservices';
import { SocketioServiceClient } from '@proto/socketio/socketio.client';
import Redis from 'ioredis';
import { PinoLogger } from 'nestjs-pino';
import { first, firstValueFrom } from 'rxjs';
import { GenWorkerService } from '@genworker/genworker/services/genworker.service';
import { UserServiceClient } from '@proto/user/user.client';
import { RegisterRequest } from '@proto/genworker/genworker';
import { Types } from 'mongoose';
import { ProjectServiceClient } from '@proto/project/project.client';


@Injectable()
export class TaskQueueService implements OnModuleInit {
  @Client(gRPC_client('user'))
  private userClient:ClientGrpc;
  private userService:UserServiceClient;

  @Client(gRPC_client('socketio'))
  private socketioClient:ClientGrpc;
  private socketioService:SocketioServiceClient;

  onModuleInit() {
    this.socketioService = this.socketioClient.getService<SocketioServiceClient>('SocketioService');
    this.userService = this.userClient.getService<UserServiceClient>('UserService');
  }

  constructor(
    private readonly logger: PinoLogger,
    private readonly response: ResponseService,
    private readonly genworkerService: GenWorkerService,
    @Inject('REDIS') private readonly redis: Redis
  ) {}

  async getGenworkerId(genworkerId:string): Promise<string> {
    if (!genworkerId.includes(":")) return genworkerId

    const res = await this.genworkerService.findByIds({genworkerIds:[genworkerId]})
    return res.genworkers[0]._id.toString()
}

  async register(data: RegisterRequest){
    const context = 'register';

    const foundGenWorker = await this.genworkerService.findOneByName({ name: data.name });
    if (foundGenWorker.res.ok) return this.response.success({res:{msg:"GenWorker registered"}, genworkerId: foundGenWorker.genworker.id}, {context});

    const genworker = await this.genworkerService.create({ownerId: data.ownerId, name: data.name, path: data.path});
    if (!genworker || !genworker.genworker) return this.response.error({res:{msg:"GenWorker registration failed"}}, {context});

    await firstValueFrom(this.userService.registerGenWorker({genWorkerId: genworker.genworker?.id, userId: data.ownerId}));
    
    return this.response.success({res:{msg:"GenWorker registered"}, genworkerId: genworker.genworker.id}, {context});
  }

  async genWorkerAssign(data) {
    const context = 'genWorkerAssign';
    const genworker = await this.genworkerService.findOneById({id: await this.getGenworkerId(data.genworkerId)})

    // @ts-ignore
    if(genworker.genworker?.projects) genworker.genworker?.projects.forEach((workerPool:any) => {
      this.redis.sadd(`${workerPool}:worker_pool:all`, data.genworkerId);
      this.redis.sadd(`${workerPool}:worker_pool:ready`, data.genworkerId);
      firstValueFrom(this.socketioService.join({objectId: `${genworker.genworker?.ownerId}:${genworker.genworker?.name}`, room: workerPool}));
    });

    // this.handleFreeWorker(data.genWorkerId);

    return this.response.success({res:{msg:"genworker assigned"}}, {context})
  }
}
