import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';
import { services_config } from '@shared/lib/services_config';

@Module({})
export class ProxyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        (req: Request, res: Response, next: NextFunction) => {
          // NIE rób parsowania body - przejdź dalej bez zmian
          next();
        },
        createProxyMiddleware({
          target: services_config.service_url.rest,
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
          // bez onProxyReq - przekazujemy strumień oryginalny
          selfHandleResponse: false, // żeby proxy sam obsłużył odpowiedź
        }),
      )
      .forRoutes('/api');
  }
}
