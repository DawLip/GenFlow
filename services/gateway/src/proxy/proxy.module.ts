import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { services_config } from '@shared/lib/services_config';

@Module({})
export class ProxyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // REST API proxy
    consumer
      .apply(
        createProxyMiddleware({
          // target: services_config.service_url.rest,
          target:'http://api:3000',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        }),
      )
      .forRoutes('/api');

    // GraphQL proxy
    consumer
      .apply(
        createProxyMiddleware({
          target: services_config.service_url.graphql,
          changeOrigin: true,
        }),
      )
      .forRoutes('/graphql');

    // Socket.IO proxy (websocket)
    consumer
      .apply(
        createProxyMiddleware({
          target: services_config.service_url.socketio,
          ws: true,
          changeOrigin: true,
        }),
      )
      .forRoutes('/socket.io');
  }
}
