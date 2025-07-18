import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { services_config } from '@shared/services_config';

export const EmailProvider = {
  provide: 'EMAIL_CLIENT',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [services_config.service_url.rabbitmq],
        queue: 'email-queue',
        queueOptions: { durable: true }
      },
    });
  },
};
