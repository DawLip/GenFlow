import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, ClientProxy, Transport } from '@nestjs/microservices';

import { AuthenticatedRequest } from '@api/types/authenticated-request';
import { ApiService } from '@api/api/api.service';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Injectable()
export class ApiSocketioService {
  constructor(
    private readonly apiService: ApiService,
    private readonly response: ResponseService,
    @Inject('SOCKETIO_CLIENT') private readonly socketioClient: ClientProxy,
  ) {}

  async send(data: {payload: any, event: string}, req: AuthenticatedRequest) {
    this.socketioClient.emit('notify_user', {
      userId: req.user.id,
      payload: data.payload,
      event: data.event
    }).subscribe(); 

    return this.response.success({res:{msg:"message send"}}, {context:"socketio/send"});
  }
}
