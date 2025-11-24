import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { services_config } from '@shared/services_config';
import { TeamServiceClient } from '@proto/team/team.client';
import { CreateRequest, UpdateRequest, FindOneByIdRequest, JoinRequest, JoinResponse, LeaveRequest, InviteRequest } from '@proto/team/team';

import { AuthenticatedRequest } from '@api/types/authenticated-request';
import { ApiService } from '@api/api/api.service';
import { gRPC_client } from '@libs/shared/src/config/gRPC_client.config';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';

@Injectable()
export class ApiTeamService implements OnModuleInit {
  constructor(
    private readonly apiService: ApiService,
    private readonly response: ResponseService
  ) {}

  @Client(gRPC_client('team'))
  private client: ClientGrpc;
  private grpcService: TeamServiceClient;

  onModuleInit() {
    this.grpcService = this.client.getService<TeamServiceClient>('TeamService');
  }

  async get(body: FindOneByIdRequest, req: AuthenticatedRequest, params: any) {
    return await firstValueFrom(this.grpcService.findOneById({id: params.teamId}));
  }

  async post(body: CreateRequest, req: AuthenticatedRequest, params: any) {
    if(!body.name) return this.response.validationFail({res:{msg:"Field 'name' is required"}}, {context:"team/post"});

    return await firstValueFrom(this.grpcService.create({ ...body, owner: req.user.id, members:[req.user.id] }));
  }

  async patch(body: UpdateRequest, req: AuthenticatedRequest, params: any) {
    if(!body.team) return this.response.validationFail({res:{msg:"Field 'team' is required"}}, {context:"team/patch"});
    if(!params.teamId) return this.response.validationFail({res:{msg:"Param 'teamId' is required"}}, {context:"team/patch"});

    return await firstValueFrom(this.grpcService.update({...body, id: params.teamId}));
  }


  async invite(body: InviteRequest, req: AuthenticatedRequest, params: any) {
    if(!params.teamId) return this.response.validationFail({res:{msg:"Param 'teamId' is required"}}, {context:"team/invite"});
    if(!params.userId) return this.response.validationFail({res:{msg:"Param 'userId' is required"}}, {context:"team/invite"});

    return await firstValueFrom(this.grpcService.invite({ ...body, id: params.teamId, user: params.userId}));
  }

  async join(body: JoinRequest, req: AuthenticatedRequest, params: any) {
    if(!body.id) return this.response.validationFail({res:{msg:"Field 'id' is required"}}, {context:"team/join"});

    return await firstValueFrom(this.grpcService.join({ ...body, user: req.user.id, id: params.teamId}));
  }

  async leave(body: LeaveRequest, req: AuthenticatedRequest, params: any) {
    if(!body.id) return this.response.validationFail({res:{msg:"Field 'field' is required"}}, {context:"team/leave"});

    return await firstValueFrom(this.grpcService.leave({ ...body, user: req.user.id, id: params.teamId}));
  }
}
