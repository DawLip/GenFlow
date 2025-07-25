import { NestFactory } from '@nestjs/core';
import { AuthModule } from '@auth/auth/auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { Logger } from 'nestjs-pino';

import { name } from '../package.json';
import { service_name } from '@libs/shared/src/service_name'
import { DefaultExceptionFilter } from '@libs/shared/src/default-exception.filter';

const s_name = service_name(name);

async function bootstrap() {
  console.log(s_name)
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.GRPC,
    options: {
      package: s_name,
      protoPath: require.resolve(`@proto/${s_name}/${s_name}.proto`),
      url: '0.0.0.0:50051',
    },
    bufferLogs: true,
  });

  grpcApp.useLogger(grpcApp.get(Logger));
  grpcApp.useGlobalFilters(new DefaultExceptionFilter(grpcApp.get(Logger)));
  
  grpcApp.listen();
  console.log(`${s_name} gRPC service running on 0.0.0.0:50051`);

  const httpApp = await NestFactory.create(AuthModule);
  await httpApp.listen(3000);
  console.log(`${s_name} HTTP health check running on http://localhost:3000/health`);
}
bootstrap();
