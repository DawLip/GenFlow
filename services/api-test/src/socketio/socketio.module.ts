import { Module } from '@nestjs/common';
import { ApiSocketioController } from './socketio.controller';
import { ApiSocketioService } from './socketio.service';
import { ApiService } from '@api-test/api/api.service';
import { SocketioProvider } from './socketio.provider';

@Module({
  controllers: [ApiSocketioController],
  providers: [ApiSocketioService, ApiService, SocketioProvider],
  exports: [ApiSocketioService],
})
export class SocketioModule {}