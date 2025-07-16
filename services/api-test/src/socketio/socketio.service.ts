import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, ClientProxy, Transport } from '@nestjs/microservices';

import { AuthenticatedRequest } from '@api-test/types/authenticated-request';
import { ApiService } from '@api-test/api/api.service';

@Injectable()
export class ApiSocketioService {
  constructor(
    private readonly apiService: ApiService,
    @Inject('SOCKETIO_CLIENT') private readonly socketioClient: ClientProxy,
  ) {}

  async send(data: {payload: any, event: string}, req: AuthenticatedRequest) {
    this.socketioClient.emit('notify_user', {
      userId: req.user.id,
      payload: data.payload,
      event: data.event
    }).subscribe(); 

    return this.apiService.handleSuccessResponse({res:{msg:"message send"}}, {context:"socketio/send"});
  }
}
