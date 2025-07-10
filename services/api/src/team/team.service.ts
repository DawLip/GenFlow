import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { TeamServiceClient } from '@proto/team/team.client';
import { CreateRequest, UpdateRequest, FindOneByIdRequest } from '@proto/team/team';

import { AuthenticatedRequest } from '@api/types/authenticated-request';
import { ApiService } from '@api/api/api.service';

@Injectable()
export class ApiTeamService implements OnModuleInit {
  constructor(private readonly apiService: ApiService) {}
  
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
    if(!body.name) return this.apiService.handleValidationError({msg:"gRPC: Field 'name' is required"}, {context:"team/create"});

    return await firstValueFrom(this.grpcService.create({ ...body, ownerId: req.user.id, members:[req.user.id] }));
  }

  async update(body: UpdateRequest) {
    if(!body.field) return this.apiService.handleValidationError({msg:"gRPC: Field 'field' is required"}, {context:"team/create"});
    if(!body.value) return this.apiService.handleValidationError({msg:"gRPC: Field 'value' is required"}, {context:"team/create"});

    return await firstValueFrom(this.grpcService.update(body));
  }

  async findOneById(body: FindOneByIdRequest) {
    return await firstValueFrom(this.grpcService.findOneById(body));
  }
}
