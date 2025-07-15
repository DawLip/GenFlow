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
          target: services_config.service_url.rest,
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
          selfHandleResponse: false,
        }),
      )
      .forRoutes('/api');

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
