import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import {CreateRequest, CreateResponse} from '@proto/genworker/genworker';
import { PinoLogger } from 'nestjs-pino';



@Injectable()
export class TasksQueueService implements OnModuleInit {
  onModuleInit() {}

  constructor(
    private readonly logger: PinoLogger,
    private readonly response: ResponseService
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    const context = 'create';


    return this.response.success({res:{msg:"GenWorker created"}},{context});
  }
}
