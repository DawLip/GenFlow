import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { TeamServiceClient } from '@proto/team/team.client';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, JoinRequest, JoinResponse, LeaveRequest } from '@proto/team/team';

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

  async get(body: FindOneByIdRequest, req: AuthenticatedRequest, params: any) {
    return await firstValueFrom(this.grpcService.findOneById({id: params.teamId}));
  }

  async post(body: CreateRequest, req: AuthenticatedRequest, params: any) {
    if(!body.name) return this.apiService.handleValidationError({res:{msg:"Field 'name' is required"}}, {context:"team/post"});

    return await firstValueFrom(this.grpcService.create({ ...body, owner: req.user.id, members:[req.user.id] }));
  }

  async patch(body: UpdateRequest, req: AuthenticatedRequest, params: any) {
    if(!body.team) return this.apiService.handleValidationError({res:{msg:"Field 'team' is required"}}, {context:"team/patch"});
    if(!params.teamId) return this.apiService.handleValidationError({res:{msg:"Param 'teamId' is required"}}, {context:"team/patch"});

    return await firstValueFrom(this.grpcService.update({...body, id: params.teamId}));
  }


  async join(body: JoinRequest, req: AuthenticatedRequest, params: any) {
    if(!body.id) return this.apiService.handleValidationError({res:{msg:"Field 'field' is required"}}, {context:"team/join"});

    return await firstValueFrom(this.grpcService.join({ ...body, user: req.user.id, id: params.teamId}));
  }

  async leave(body: LeaveRequest, req: AuthenticatedRequest, params: any) {
    if(!body.id) return this.apiService.handleValidationError({res:{msg:"Field 'field' is required"}}, {context:"team/leave"});

    return await firstValueFrom(this.grpcService.leave({ ...body, user: req.user.id, id: params.teamId}));
  }
}
