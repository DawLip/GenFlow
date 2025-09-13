import { Observable } from 'rxjs';
import { CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse, JoinRequest, JoinResponse, LeaveResponse, LeaveRequest, FindByUserIdRequest, FindByUserIdResponse, AssignGenworkerToTeamRequest, DefaultResponse } from '@proto/team/team';

export interface TeamServiceClient {
  create(data: CreateRequest): Observable<CreateResponse>;
  update(data: UpdateRequest): Observable<UpdateResponse>;
  findOneById(data: FindOneByIdRequest): Observable<FindResponse>;
  findByUserId(data: FindByUserIdRequest): Observable<FindByUserIdResponse>;
  join(data: JoinRequest): Observable<JoinResponse>;
  leave(data: LeaveRequest): Observable<LeaveResponse>;

  assignGenworkerToTeam(data: AssignGenworkerToTeamRequest): Observable<DefaultResponse>;
}