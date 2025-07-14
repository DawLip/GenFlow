import { NestFactory } from '@nestjs/core';
import { AppModule } from '@graphql/app/app.module';
import { Logger } from 'nestjs-pino';

import { name } from '../package.json';
import { service_name } from '@shared/service_name'
import { DefaultExceptionFilter } from '@libs/shared/src/default-exception.filter';
import { GrpcExceptionFilter } from '@libs/shared/src/grpc-exception.filter';

const s_name = service_name(name);

async function bootstrap() {
  const port = process.env.PORT||3000;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useLogger(app.get(Logger));

  app.useGlobalFilters(new DefaultExceptionFilter(app.get(Logger)));
  app.useGlobalFilters(new GrpcExceptionFilter(app.get(Logger)));

  await app.listen(port);
  console.log(`${s_name} service running on http://localhost:${port}`);
}
bootstrap();
