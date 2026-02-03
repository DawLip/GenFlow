import { NestFactory } from '@nestjs/core';
import { AppModule } from '@socket.io/app/app.module';
import { Logger } from 'nestjs-pino';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { name } from '../package.json';
import { service_name } from '@shared/service_name';
import { GrpcExceptionFilter } from '@libs/shared/src/grpc-exception.filter';
import { DefaultExceptionFilter } from '@libs/shared/src/default-exception.filter';
import { services_config } from '@shared/services_config';

import { RedisIoAdapter } from '@socket.io/app/redis-io.adapter'; 

const s_name = service_name(name);

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  const redisUrl = 
    services_config?.service_url?.redis ;

  const redisIoAdapter = new RedisIoAdapter(app, redisUrl);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [services_config.service_url.rabbitmq],
      queue: 'NOTIFICATIONS',
      queueOptions: { durable: false },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: services_config.service_url.socketio_rpc,
      package: ['socketio'],
      protoPath: [require.resolve(`@proto/socketio/socketio.proto`)],
      loader: {
        enums: String,
        objects: true,
        arrays: true,
        longs: String,
        defaults: true,
        oneofs: true,
        keepCase: false,
      },
      maxReceiveMessageLength: 10 * 1024 * 1024,
      maxSendMessageLength: 10 * 1024 * 1024,
    },
  });

  app.enableCors();
  app.useLogger(app.get(Logger));

  app.useGlobalFilters(new DefaultExceptionFilter(app.get(Logger)));
  app.useGlobalFilters(new GrpcExceptionFilter(app.get(Logger)));

  await app.startAllMicroservices();
  await app.listen(port);

  console.log(`${s_name} service running on http://localhost:${port}`);
}

bootstrap();
