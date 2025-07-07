import { NestFactory } from '@nestjs/core';
import { AuthModule } from '@auth/auth/auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: require.resolve('@proto/lib/auth.proto'),
      url: '0.0.0.0:50051',
    },
    bufferLogs: true,
  });

  grpcApp.listen();
  console.log(`Auth gRPC service running on 0.0.0.0:50051`);

  const httpApp = await NestFactory.create(AuthModule);
  await httpApp.listen(3000);
  console.log(`Auth HTTP health check running on http://localhost:3000/health`);
}
bootstrap();
