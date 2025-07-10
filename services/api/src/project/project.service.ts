import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { ProjectServiceClient } from '@proto/project/project.client';
import { CreateRequest, UpdateRequest, FindOneByIdRequest } from '@proto/project/project';

import { AuthenticatedRequest } from '@api/types/authenticated-request';

@Injectable()
export class ProjectService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'project',
      protoPath: require.resolve('@proto/project/project.proto'),
      url: services_config.service_url.project_rpc,
    },
  })
  private client: ClientGrpc;

  private grpcService: ProjectServiceClient;

  onModuleInit() {
    this.grpcService = this.client.getService<ProjectServiceClient>('ProjectService');
  }

  async create(body: CreateRequest, req: AuthenticatedRequest) {
    return await firstValueFrom(this.grpcService.create({ ...body, ownerId: req.user.id }));
  }

  async update(body: UpdateRequest) {
    return await firstValueFrom(this.grpcService.update(body));
  }

  async findOneById(body: FindOneByIdRequest) {
    return await firstValueFrom(this.grpcService.findOneById(body));
  }
}
