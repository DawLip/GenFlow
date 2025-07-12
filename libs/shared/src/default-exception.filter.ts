// src/common/filters/default-exception.filter.ts
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const type = host.getType();

    const errorBody = {
      ok: false,
      status: 'ERROR',
      msg:
        exception instanceof HttpException
          ? this.extractMessage(exception.getResponse())
          : (exception as Error)?.message || 'Internal server error',
    };

    if (type === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

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
        `HTTP Exception: ${errorBody.msg}`,
      );

      response.status(status).json({ res: errorBody });
    } else if (type === 'rpc') {
      this.logger.error(
        {
          err: exception,
          res: errorBody,
        },
        `gRPC Exception: ${errorBody.msg}`,
      );

      throw new RpcException(errorBody);
    } else {
      this.logger.error({ err: exception }, `Unhandled Exception: ${errorBody.msg}`);
      throw exception;
    }
  }

  private extractMessage(response: string | object): string {
    if (typeof response === 'string') return response;
    if (typeof response === 'object' && 'message' in response) {
      const msg = (response as any).message;
      return Array.isArray(msg) ? msg.join(', ') : msg;
    }
    return 'Internal server error';
  }
}
