import { Injectable, OnModuleInit } from '@nestjs/common';
import {CreateRequest, CreateResponse} from '@proto/genworker/genworker';
import { PinoLogger } from 'nestjs-pino';



@Injectable()
export class TasksQueueService implements OnModuleInit {
  onModuleInit() {}

  constructor(
    private readonly logger: PinoLogger,
  ) {}

  async create(data:CreateRequest):Promise<CreateResponse> {
    const context = 'create';


    return this.handleSuccessResponse({res:{msg:"GenWorker created"}},{context});
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
