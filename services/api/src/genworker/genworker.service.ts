import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { AuthServiceClient } from '@proto/auth/auth.client';
import { ApiService } from '@api/api/api.service';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';
import { GenWorkerServiceClient } from '@proto/genworker/genworker.client';

@Injectable()
export class ApiGenWorkerService implements OnModuleInit {
  constructor(
    private readonly apiService: ApiService,
    private readonly response: ResponseService,
  ) {}

  @Client(gRPC_client('genworker'))
  private client: ClientGrpc;
  private grpcService: GenWorkerServiceClient;

  onModuleInit() {
    this.grpcService = this.client.getService<GenWorkerServiceClient>('GenWorkerService');
  }

  enqueue(body) {
    // if(!body.email) return this.response.validationFail({res:{msg:"Field 'email' is required"}}, {context:"auth/login"});
    return this.grpcService.enqueue(body);
  }

  dequeue(body) {
    return firstValueFrom(this.grpcService.dequeue(body));
  }
}