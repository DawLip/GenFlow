import { NestFactory } from '@nestjs/core';
import { UserModule } from '@user/user/user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: require.resolve('@proto/lib/user.proto'),
      url: '0.0.0.0:50051',
    },
  });

  grpcApp.listen();
  console.log(`Auth gRPC service running on 0.0.0.0:50051`);

  const httpApp = await NestFactory.create(UserModule);
  await httpApp.listen(3000);
  console.log(`Auth HTTP health check running on http://localhost:3000/health`);
}
bootstrap();
