import { NestFactory } from '@nestjs/core';
import { ApiModule } from '@api/api/api.module';

import { Logger } from 'nestjs-pino';

import { name } from '../package.json';
import { service_name } from '@shared/service_name'
import { GrpcExceptionFilter } from '@shared/grpc-exception.filter';
import { DefaultExceptionFilter } from '@libs/shared/src/default-exception.filter';


const s_name = service_name(name);

async function bootstrap() {
  const port = process.env.PORT||3000;

  const app = await NestFactory.create(ApiModule);

  app.enableCors();
  app.useLogger(app.get(Logger));

  app.useGlobalFilters(new GrpcExceptionFilter(app.get(Logger)));
  app.useGlobalFilters(new DefaultExceptionFilter(app.get(Logger)));

  await app.listen(port);
  console.log(`${s_name} service running on http://localhost:${port}`);
}
bootstrap();
 