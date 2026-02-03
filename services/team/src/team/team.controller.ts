import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, GrpcMethod } from '@nestjs/microservices';
import { FindByTeamIdRequest, FindByTeamIdResponse } from '@proto/project/project';
import {
    CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse,
    JoinRequest,
    JoinResponse,
    LeaveRequest,
    LeaveResponse,
    FindByUserIdRequest,
    FindByUserIdResponse,
    AssignGenworkerToTeamRequest,
    DefaultResponse,
    RemoveGenworkerFromTeamRequest,
    RemoveStorageGenworkerRequest,
    AddStorageGenworkerRequest,
    SetMasterGenworkerRequest,
    InviteRequest
} from '@proto/team/team';
import { TeamService } from '@team/team/team.service';

@Controller()
export class TeamController {
    constructor(
        private readonly teamService: TeamService
    ) { }

    @GrpcMethod('TeamService', 'Create')
    async create(data: CreateRequest): Promise<CreateResponse> {
        return await this.teamService.create(data);
    }

    @GrpcMethod('TeamService', 'Update')
    async update(data: UpdateRequest): Promise<UpdateResponse> {
        return await this.teamService.update(data);
    }

    @GrpcMethod('TeamService', 'FindOneById')
    async findOneById(data: FindOneByIdRequest): Promise<FindResponse> {
        return await this.teamService.findOneById(data);
    }

    @GrpcMethod('TeamService', 'FindByUserId')
    async findByUserId(data: FindByUserIdRequest): Promise<FindByUserIdResponse> {
        return await this.teamService.findByUserId(data);
    }


    @GrpcMethod('TeamService', 'Invite')
    async invite(data: InviteRequest): Promise<DefaultResponse> {
        return await this.teamService.invite(data);
    }

    @GrpcMethod('TeamService', 'Join')
    async join(data: JoinRequest): Promise<JoinResponse> {
        return await this.teamService.join(data);
    }

    @GrpcMethod('TeamService', 'Leave')
    async leave(data: LeaveRequest): Promise<LeaveResponse> {
        return await this.teamService.leave(data);
    }

    @GrpcMethod('TeamService', 'AssignGenworkerToTeam')
    async assignGenworkerToTeam(data: AssignGenworkerToTeamRequest): Promise<DefaultResponse> {
        return await this.teamService.assignGenworkerToTeam(data);
    }

    @GrpcMethod('TeamService', 'RemoveGenworkerFromTeam')
    async removeGenworkerFromTeam(data: RemoveGenworkerFromTeamRequest): Promise<DefaultResponse> {
        return await this.teamService.removeGenworkerFromTeam(data);
    }
    @GrpcMethod('TeamService', 'SetMasterGenworker')
    async setMasterGenworker(data: SetMasterGenworkerRequest): Promise<DefaultResponse> {
        return await this.teamService.setMasterGenworker(data);
    }
    @GrpcMethod('TeamService', 'AddStorageGenworker')
    async addStorageGenworker(data: AddStorageGenworkerRequest): Promise<DefaultResponse> {
        return await this.teamService.addStorageGenworker(data);
    }
    @GrpcMethod('TeamService', 'RemoveStorageGenworker')
    async removeStorageGenworker(data: RemoveStorageGenworkerRequest): Promise<DefaultResponse> {
        return await this.teamService.removeStorageGenworker(data);
    }
}
