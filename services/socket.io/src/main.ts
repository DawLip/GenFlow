import { NestFactory } from '@nestjs/core';
import { AppModule } from '@socket.io/app/app.module';
import * as express from 'express';
import { Logger } from 'nestjs-pino';

import { name } from '../package.json';
import { service_name } from '@shared/service_name'

const s_name = service_name(name);

async function bootstrap() {
  const port = process.env.PORT||3000;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useLogger(app.get(Logger));
  await app.listen(port);
  console.log(`${s_name} service running on http://localhost:${port}`);
}
bootstrap();
