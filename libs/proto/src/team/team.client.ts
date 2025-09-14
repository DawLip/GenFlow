import { Observable } from 'rxjs';
import { CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse, JoinRequest, JoinResponse, LeaveResponse, LeaveRequest, FindByUserIdRequest, FindByUserIdResponse, AssignGenworkerToTeamRequest, DefaultResponse, RemoveGenworkerFromTeamRequest, SetMasterGenworkerRequest, AddStorageGenworkerRequest, RemoveStorageGenworkerRequest } from '@proto/team/team';

export interface TeamServiceClient {
  create(data: CreateRequest): Observable<CreateResponse>;
  update(data: UpdateRequest): Observable<UpdateResponse>;
  findOneById(data: FindOneByIdRequest): Observable<FindResponse>;
  findByUserId(data: FindByUserIdRequest): Observable<FindByUserIdResponse>;
  join(data: JoinRequest): Observable<JoinResponse>;
  leave(data: LeaveRequest): Observable<LeaveResponse>;

  assignGenworkerToTeam(data: AssignGenworkerToTeamRequest): Observable<DefaultResponse>;
  removeGenworkerFromTeam(data: RemoveGenworkerFromTeamRequest): Observable<DefaultResponse>;
  setMasterGenworker(data: SetMasterGenworkerRequest): Observable<DefaultResponse>;
  addStorageGenworker(data: AddStorageGenworkerRequest): Observable<DefaultResponse>;
  removeStorageGenworker(data: RemoveStorageGenworkerRequest): Observable<DefaultResponse>;
}