import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class ResponseService {
  constructor(private readonly logger: PinoLogger) {}

  prepareResponse(response:any, status: 'SUCCESS' | 'ERROR' | 'VALIDATION_FAILED' | 'FAILED'): any {
    return {
      ...response, 
      res:{
        ok: status === 'SUCCESS',
        status,
      ...response.res
      },
    }
  }

  success(response:any, logData:any, logMsg?:string):any {
    const res = this.prepareResponse(response, 'SUCCESS');
    this.logger.trace({response:res, ...logData, level: 'trace' }, logMsg || response.res.msg);
    console.log("test")
    return res;
  }

  validationFail(response:any, logData:any, logMsg?:string):any {
    const res = this.prepareResponse(response, 'VALIDATION_FAILED');
    this.logger.warn({response:res, ...logData }, logMsg || response.res.msg);
    return res;
  }

  fail(response:any, logData:any, logMsg?:string):any {
    const res = this.prepareResponse(response, 'FAILED');
    this.logger.warn({response:res, ...logData }, logMsg || response.res.msg);
    return res;
  }

  error(response:any, logData:any, logMsg?:string):any {
    const res = this.prepareResponse(response, 'ERROR');
    this.logger.error({response:res, ...logData }, logMsg || response.res.msg);
    return res;
  }
}