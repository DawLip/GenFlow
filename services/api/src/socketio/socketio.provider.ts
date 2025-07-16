import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { services_config } from '@shared/services_config';

export const SocketioProvider = {
  provide: 'SOCKETIO_CLIENT',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [services_config.service_url.rabbitmq],
        queue: 'NOTIFICATIONS',
        queueOptions: { durable: false }
      },
    });
  },
};
