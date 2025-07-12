// src/common/filters/all-exceptions.filter.ts
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : (exception as Error)?.message || 'Internal server error';

    const errorBody = {
      ok: false,
      status: 'ERROR',
      msg: typeof message === 'string' ? message : (message as any)?.message || message,
    };

    this.logger.error(
      {
        req: {
          method: request.method,
          url: request.url,
          body: request.body,
          query: request.query,
          params: request.params,
        },
        err: exception,
        res: errorBody,
      },
      `HTTP Exception: ${JSON.stringify(errorBody.msg)}`,
    );

    response.status(status).json({ res: errorBody });
  }
}
