import { NestFactory } from '@nestjs/core';
import { ProjectModule } from '@project/project/project.module';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { name } from '../package.json';
import { service_name } from '@shared/service_name'
import { GrpcExceptionFilter } from '@shared/grpc-exception.filter';

const s_name = service_name(name);

async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(ProjectModule, {
    transport: Transport.GRPC,
    options: {
      package: s_name,
      protoPath: require.resolve(`@proto/${s_name}/${s_name}.proto`),
      url: '0.0.0.0:50051',
    },
    bufferLogs: true,
  });
  grpcApp.useLogger(grpcApp.get(Logger));
  grpcApp.useGlobalFilters(new GrpcExceptionFilter(grpcApp.get(Logger)));
  grpcApp.listen();
  console.log(`${s_name} gRPC service running on localhost:50051`);

  const httpApp = await NestFactory.create(ProjectModule);
  await httpApp.listen(3000);
  console.log(`${s_name} HTTP health check running on localhost:3000/health`);
}
bootstrap();
