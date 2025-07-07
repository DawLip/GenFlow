import { NestFactory } from '@nestjs/core';
import { AppModule } from '@gateway/app/app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bodyParser: false
  });

  app.enableCors();
  // app.use(express.raw({ type: '*/*' }));
  app.use('/api', (req, res, next) => {
    next(); // nie wywołuj express.json() tutaj
  });

  await app.listen(3000);
  console.log('Gateway running on http://localhost:3000');
}
bootstrap();
