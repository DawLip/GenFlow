import { NestFactory } from '@nestjs/core';
import { UserModule } from '@user/user/user.module';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { name } from '../package.json';
import { service_name } from '@shared/service_name'
import { DefaultExceptionFilter } from '@libs/shared/src/default-exception.filter';
import { GrpcExceptionFilter } from '@libs/shared/src/grpc-exception.filter';

const s_name = service_name(name);

async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,
    options: {
      package: s_name,
      protoPath: require.resolve(`@proto/${s_name}/${s_name}.proto`),
      url: '0.0.0.0:50051',
    },
  });
  grpcApp.useLogger(grpcApp.get(Logger));
  grpcApp.useGlobalFilters(new DefaultExceptionFilter(grpcApp.get(Logger)));
  grpcApp.useGlobalFilters(new GrpcExceptionFilter(grpcApp.get(Logger)));
  grpcApp.listen();
  console.log(`${s_name} gRPC service running on localhost:50051`);

  const httpApp = await NestFactory.create(UserModule);
  await httpApp.listen(3000);
  console.log(`${s_name} HTTP health check running on localhost:3000/health`);
}
bootstrap();
