import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { AppModule } from '@gateway/app/app.module';
import { Logger } from 'nestjs-pino';

import { name } from '../package.json';
import { service_name } from '@shared/service_name'
import { services_config } from '@shared/services_config';

const s_name = service_name(name);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bodyParser: false});
  const expressApp = app.getHttpAdapter().getInstance();

  const socketProxy = createProxyMiddleware({target: services_config.service_url.socketio});
  expressApp.use('/socket.io', socketProxy);

  app.enableCors();
  app.use('/api', (req, res, next) => {
    next(); 
  });

  app.useLogger(app.get(Logger));

  const server = await app.listen(3000);
  server.on('upgrade', socketProxy.upgrade);
  console.log(`${s_name} running on http://localhost:3000`);

}
bootstrap();
