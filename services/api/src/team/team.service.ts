import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { TeamServiceClient } from '@proto/team/team.client';
import { CreateRequest, UpdateRequest, FindOneByIdRequest } from '@proto/team/team';

import { AuthenticatedRequest } from '@api/types/authenticated-request';

@Injectable()
export class TeamService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'team',
      protoPath: require.resolve('@proto/team/team.proto'),
      url: services_config.service_url.team_rpc,
    },
  })
  private client: ClientGrpc;

  private grpcService: TeamServiceClient;

  onModuleInit() {
    this.grpcService = this.client.getService<TeamServiceClient>('TeamService');
  }

  async create(body: CreateRequest, req: AuthenticatedRequest) {
    return await firstValueFrom(this.grpcService.create({ ...body, ownerId: req.user.id, members:[req.user.id] }));
  }

  async update(body: UpdateRequest) {
    return await firstValueFrom(this.grpcService.update(body));
  }

  async findOneById(body: FindOneByIdRequest) {
    return await firstValueFrom(this.grpcService.findOneById(body));
  }
}
