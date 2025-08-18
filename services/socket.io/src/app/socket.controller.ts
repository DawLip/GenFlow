import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest, CreateResponse, 
  UpdateRequest, UpdateResponse, 
  FindOneByIdRequest, FindResponse,
  CreateFlowRequest, CreateFlowResponse,
  UpdateFlowRequest, UpdateFlowResponse,
  FindOneByNameFlowRequest, FindFlowResponse,
  FindByTeamIdRequest, FindByTeamIdResponse,
  UpdateFlowDataResponse,
  UpdateFlowDataRequest
} from '@proto/project/project';
import { DefaultResponse, EmitRequest, JoinRequest } from '@proto/socketio/socketio';
import { SocketService } from '@socket.io/app/socket.service';

@Controller()
export class SocketController {
  constructor(private readonly socketService: SocketService) {}

  @GrpcMethod('SocketioService', 'Emit')
  async emit(data: EmitRequest): Promise<DefaultResponse> {
    return await this.socketService.emit(data);
  }

  @GrpcMethod('SocketioService', 'Join')
  async join(data: JoinRequest): Promise<DefaultResponse> {
    return await this.socketService.join(data);
  }
}
