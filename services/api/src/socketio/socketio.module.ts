import { Module } from '@nestjs/common';
import { ApiSocketioController } from './socketio.controller';
import { ApiSocketioService } from './socketio.service';
import { ApiService } from '@api/api/api.service';
import { SocketioProvider } from './socketio.provider';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Module({
  controllers: [ApiSocketioController],
  providers: [ApiSocketioService, ApiService, SocketioProvider, ResponseService],
  exports: [ApiSocketioService],
})
export class SocketioModule {}