import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, ClientProxy, Transport } from '@nestjs/microservices';

import { AuthenticatedRequest } from '@api/types/authenticated-request';
import { ApiService } from '@api/api/api.service';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Injectable()
export class ApiEmailService {
  constructor(
    private readonly apiService: ApiService,
    private readonly response: ResponseService,
    @Inject('EMAIL_CLIENT') private readonly emailClient: ClientProxy,
  ) {}

  async send(body: { to: string; subject: string; body: string }, req: AuthenticatedRequest) {
    this.emailClient.emit('send_email', {
      to: body.to || "default 'to'",
      subject: body.subject || "default 'subject'",
      body: body.body || "default 'body'",
      from: 'noreply@example.com', 
    }).subscribe(); 

    return { ok: true };
  }
}
