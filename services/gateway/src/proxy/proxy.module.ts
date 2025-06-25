import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { serviceRoutes } from '../config/services.config';

@Module({})
export class ProxyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // REST API proxy
    consumer
      .apply(
        createProxyMiddleware({
          target: serviceRoutes.rest,
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        }),
      )
      .forRoutes('/api');

    // GraphQL proxy
    consumer
      .apply(
        createProxyMiddleware({
          target: serviceRoutes.graphql,
          changeOrigin: true,
        }),
      )
      .forRoutes('/graphql');

    // Socket.IO proxy (websocket)
    consumer
      .apply(
        createProxyMiddleware({
          target: serviceRoutes.socket,
          ws: true,
          changeOrigin: true,
        }),
      )
      .forRoutes('/socket.io');
  }
}
