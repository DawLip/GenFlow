import { NestFactory } from '@nestjs/core';
import { ApiModule } from '@api/api/api.module';

async function bootstrap() {
  const port = process.env.PORT||3000;

  const app = await NestFactory.create(ApiModule);

  app.enableCors();

  await app.listen(port);
  console.log(`Api running on http://localhost:${port}`);
}
bootstrap();
