import { NestFactory } from '@nestjs/core';
import { UserModule } from '@user/user/user.module';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { name } from '../package.json';
import { service_name } from '@libs/shared/src/lib/service_name'

const s_name = service_name(name);

async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,
    options: {
      package: s_name,
      protoPath: require.resolve(`@proto/lib/${s_name}.proto`),
      url: '0.0.0.0:50051',
    },
  });
  grpcApp.useLogger(grpcApp.get(Logger));
  grpcApp.listen();
  console.log(`${s_name} gRPC service running on localhost:50051`);

  const httpApp = await NestFactory.create(UserModule);
  await httpApp.listen(3000);
  console.log(`${s_name} HTTP health check running on localhost:3000/health`);
}
bootstrap();
