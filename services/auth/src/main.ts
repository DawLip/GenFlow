import { NestFactory } from '@nestjs/core';
import { AppModule } from '@auth/app/app.module';
import * as express from 'express';

async function bootstrap() {
  const port = process.env.PORT||3000;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(port);
  console.log(`Auth running on http://localhost:${port}`);
}
bootstrap();
