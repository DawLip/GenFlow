import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';

@Catch()
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    super();
  }

  override catch(exception: any, host: ArgumentsHost) {
    this.logger.error(
      {
        err: exception
      },
      `gRPC Exception: ${exception?.message || 'Unknown error'}`,
    );
    return super.catch(exception, host);
  }
}
