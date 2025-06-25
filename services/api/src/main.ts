import { NestFactory } from '@nestjs/core';
import { AppModule } from '@api/app/app.module';
import * as express from 'express';

async function bootstrap() {
  const port = process.env.PORT||3000;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(port);
  console.log(`Api running on http://localhost:${port}`);
}
bootstrap();
