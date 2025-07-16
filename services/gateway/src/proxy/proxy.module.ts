import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';
import { services_config } from '@shared/services_config';

@Module({})
export class ProxyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        (req: Request, res: Response, next: NextFunction) => {
          next(); 
        },
        createProxyMiddleware({
          target: services_config.service_url.api_test,
          changeOrigin: true,
          pathRewrite: { '^/api-test': '' },
          selfHandleResponse: false,
        }),
      )
      .forRoutes('/api-test');

    consumer
      .apply(
        (req: Request, res: Response, next: NextFunction) => {
          next(); 
        },
        createProxyMiddleware({
          target: services_config.service_url.graphql,
          changeOrigin: true,
          selfHandleResponse: false,
        }),
      )
      .forRoutes('/graphql');
  }
}
