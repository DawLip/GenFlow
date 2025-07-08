import { NestFactory } from '@nestjs/core';
import { AppModule } from '@gateway/app/app.module';
import * as express from 'express';

import { name } from '../package.json';
import { service_name } from '@libs/shared/src/lib/service_name'
import { Logger } from '@nestjs/common';

const s_name = service_name(name);

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bodyParser: false
  });

  app.enableCors();
  app.use('/api', (req, res, next) => {
    next(); 
  });

  app.useLogger(app.get(Logger));
  await app.listen(3000);
  console.log(`${s_name} running on http://localhost:3000`);
}
bootstrap();
