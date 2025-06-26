import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const port = process.env.PORT||3000;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: require.resolve('@proto/lib/hero.proto'),
      url: '0.0.0.0:50051',
    },
  });

  await app.listen();
  console.log(`Auth running on http://localhost:${port}`);
}
bootstrap();
