import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { PinoLogger } from 'nestjs-pino';



@Injectable()
export class TaskQueueService implements OnModuleInit {
  onModuleInit() {}

  constructor(
    private readonly logger: PinoLogger,
    private readonly response: ResponseService,
    @Inject('REDIS') private readonly redis: Redis
  ) {}
  
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
}
