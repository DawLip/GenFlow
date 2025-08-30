import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, type ClientGrpc } from '@nestjs/microservices';
import { SocketioServiceClient } from '@proto/socketio/socketio.client';
import Redis from 'ioredis';
import { PinoLogger } from 'nestjs-pino';
import { firstValueFrom } from 'rxjs';
import { GenWorkerService } from '@genworker/genworker/services/genworker.service';
import { UserServiceClient } from '@proto/user/user.client';
import { RegisterRequest } from '@proto/genworker/genworker';
import { TaskService } from './task.service';
import { Types } from 'mongoose';


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
    private readonly taskService: TaskService,
    @Inject('REDIS') private readonly redis: Redis
  ) {}
  
  // === redis wrappers ===
  redisKey({object, projectId, flowName, path}) {
    let redisKey = `${projectId}:${path}${flowName}:${object}`;
    return redisKey;
  }

  async enqueue ({projectId, flowName, data}) {
    const context = 'enqueue';
    
    const redisKey = `task_queue:${projectId}:${flowName}`;
    this.redis.rpush(redisKey, data);
    return this.response.success({res:{msg:"task enqueued"}},{context});
  }

  async dequeue({projectId, flowName}) {
    const context = 'dequeue';

    const redisKey = `task_queue:${projectId}:${flowName}`;
    const data = await this.redis.lpop(redisKey);
    if (!data) return this.response.fail({res:{msg:"No tasks in queue"}}, {context});

    return this.response.success({res:{msg:"task dequeued"}, data}, {context});
  }

  async assignTaskToWorker(taskId: string, workerId: string, workerPool: string){
    this.redis.smove(`${workerPool}:ready`, `${workerPool}:working`, workerId);

    await this.taskService.update({id: taskId, task: {isProcessingBy: new Types.ObjectId(workerId)}});

    this.socketioService.emit({room: workerId, event: 'task_assigned', data: taskId})
  }
  // === supporting methods ===

  async handleNewTask({projectId, flowName, path, data, taskState}) {
    const context = 'handleNewTask';

    const task = await this.taskService.create({projectId, flowName, path, data, taskState});
    this.redis.rpush(this.redisKey({object: `task_queue:${taskState}`, projectId, flowName, path}), task.task.id);

    const genworkersReady = await this.redis.smembers(`${projectId}:${path}${flowName}:worker_pool:ready`);
    if(genworkersReady.length==0) return this.response.fail({res:{msg:"there is no free genworkers"}, data}, {context});
    this.assignTaskToWorker(task.task.id, genworkersReady[0], `${projectId}:${path}${flowName}:worker_pool`);

    return this.response.success({res:{msg:"new task handled"}, data}, {context});
  }

  handleFreeWorker(data) {
    const context = 'handleFreeWorker';

    return this.response.success({res:{msg:"free worker handled"}, data}, {context});
  }

  noSegmentationStrategy(data) {
    return [{data, taskState: 'waiting'}];
  }

  segmentTask({data, strategy}) {
    const context = 'segmentTask';
    let taskSegments: any[] = [];

    switch (strategy) {
      case 'noSegmentationStrategy': taskSegments = this.noSegmentationStrategy(data); break;
      default: return this.response.error({res:{msg:"unknown segmentation strategy"}}, {context});
    }
    return this.response.success({res:{msg:"task segmented"}, data: taskSegments}, {context});
  }


  // === gRPC handlers ===

  async enqueueTask({projectId, flowName, path, data}) {
    const context = 'enqueueTask';
    console.log(context, projectId, flowName, path, data)
    const taskSegmentsRes = this.segmentTask({data, strategy: 'noSegmentationStrategy'});
    if (!taskSegmentsRes.res.ok) return this.response.error({res:{msg:"task segmentation error"}}, {context});

    taskSegmentsRes.data.forEach(async (segment: any) => this.handleNewTask({projectId, flowName, path, data: JSON.parse(segment.data), taskState: segment.taskState}));

    return this.response.success({res:{msg:"task enqueued"}}, {context})
  }

  async finishPartialTask(data) {
    const context = 'finishPartialTask';

    return this.response.error({res:{msg:"Not implemented"}}, {context});

    return this.response.success({res:{msg:"partial task finished"}}, {context});
  }

  async finishTask(data) {
    const context = 'finishTask';

    this.redis.srem(this.redisKey({object: 'task_queue:waiting', projectId: data.projectId, flowName: data.flowName, path: data.path}), data.taskId);

    this.redis.smove(
      this.redisKey({object: ':worker_pool:working', projectId: data.projectId, flowName: data.flowName, path: data.path}), 
      this.redisKey({object: ':worker_pool:ready', projectId: data.projectId, flowName: data.flowName, path: data.path}), 
      data.workerId
    );

    this.socketioService.emit({
      room: `${data.projectId}:${data.flowName}`,
      event: 'task_finished',
      data: JSON.stringify({taskId: data.taskId, workerId: data.workerId})
    });

    // handleFreeWorker(data.workerId);

    return this.response.success({res:{msg:"task finished"}}, {context})
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
    const genworker = await this.genworkerService.findOneById({id: data.genworkerId})
    // @ts-ignore
    if(genworker.genworker?.projects) genworker.genworker?.projects.forEach((workerPool:any) => {
      this.redis.sadd(`${workerPool}:all`, data.genworkerId);
      this.redis.sadd(`${workerPool}:ready`, data.genworkerId);
      this.socketioService.join({objectId: data.genworkerId, room: workerPool});
    });

    // this.handleFreeWorker(data.genWorkerId);

    return this.response.success({res:{msg:"genworker assigned"}}, {context})
  }

  async genWorkerAssignToFlow(data) {
    const context = 'genWorkerAssignToFlow';

    this.genworkerService.assignToFlow(data)

    return this.response.success({res:{msg:"genworker assigned to flow"}}, {context})
  }

  async getGenWorkersAssignedToFlow(data) {
    const context = 'getGenWorkersAssignedToFlow';
    const genworkersIds = await this.redis.smembers(`${data.projectId}:${data.path}${data.flowName}:worker_pool:all`);
    
    const genworkers = (await this.genworkerService.findByIds({genworkerIds: genworkersIds})).genworkers;

    return this.response.success({res:{msg:"genworkers returned"}, genworkers}, {context})
  }

  async genWorkerDisconnect(data) {
    const context = 'genWorkerDisconnect';

    this.redis.srem(`${data.workerPool}:all`, data.genWorkerId);
    this.redis.srem(`${data.workerPool}:ready`, data.genWorkerId);

    return this.response.success({res:{msg:"genworker disconnected"}}, {context})
  }

}
