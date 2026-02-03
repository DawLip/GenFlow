import { NestFactory } from '@nestjs/core';
import { EmailModule } from '@email/email/email.module';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { name } from '../package.json';
import { service_name } from '@shared/service_name'
import { services_config } from '@shared/services_config';

const s_name = service_name(name);

async function bootstrap() {
  const rmqApp = await NestFactory.createMicroservice<MicroserviceOptions>(EmailModule, {
    transport: Transport.RMQ,
    options: {
      urls: [services_config.service_url.rabbitmq], 
      queue: `${s_name}-queue`,       
      queueOptions: {
        durable: true,
      },
    },
  });

  rmqApp.useLogger(rmqApp.get(Logger));
  await rmqApp.listen();
  console.log(`${s_name} RMQ service listening on queue "${s_name}-queue"`);

  const httpApp = await NestFactory.create(EmailModule);
  await httpApp.listen(3000);
  console.log(`${s_name} HTTP health check running on localhost:3000/health`);
}
bootstrap();
