import { Observable } from 'rxjs';
import { CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest,FindOneByProjectRequest, FindResponse, DefaultResponse, RegisterRequest, EnqueueRequest, GenWorkerAssignRequest, GenWorkerDisconnectRequest, FinishTaskRequest, FinishPartialTaskRequest, GetGenWorkersAssignedToFlowRequest, GetGenWorkersAssignedToFlowResponse, GenWorkerAssignToFlowRequest, GetTaskByIdRequest, FindTaskResponse, GenWorkerAssignToProjectRequest, GenWorkerAssignToTeamRequest, GenWorkerRemoveFromTeamRequest, GenWorkerTeamSetMasterRequest, GenWorkerTeamAddStorageRequest, GenWorkerTeamRemoveStorageRequest } from '@proto/genworker/genworker';

export interface GenWorkerServiceClient {
  // CRUD
  create(data: CreateRequest): Observable<CreateResponse>;
  update(data: UpdateRequest): Observable<UpdateResponse>;
  findOneById(data: FindOneByIdRequest): Observable<FindResponse>;
  findOneByProject(data: FindOneByProjectRequest): Observable<FindResponse>;

  // Special
  enqueueTask(data: EnqueueRequest): Observable<DefaultResponse>;
  finishPartialTask(data: FinishPartialTaskRequest): Observable<DefaultResponse>;
  finishTask(data: FinishTaskRequest): Observable<DefaultResponse>;

  register(data: RegisterRequest): Observable<DefaultResponse>;
  genWorkerAssign(data: GenWorkerAssignRequest): Observable<DefaultResponse>;

  genWorkerAssignToTeam(data: GenWorkerAssignToTeamRequest): Observable<DefaultResponse>;
  genWorkerRemoveFromTeam(data: GenWorkerRemoveFromTeamRequest): Observable<DefaultResponse>;
  genWorkerTeamSetMaster(data: GenWorkerTeamSetMasterRequest): Observable<DefaultResponse>;
  genWorkerTeamAddStorage(data: GenWorkerTeamAddStorageRequest): Observable<DefaultResponse>;
  genWorkerTeamRemoveStorage(data: GenWorkerTeamRemoveStorageRequest): Observable<DefaultResponse>;

  genWorkerAssignToProject(data: GenWorkerAssignToProjectRequest): Observable<DefaultResponse>;
  genWorkerAssignToFlow(data: GenWorkerAssignToFlowRequest): Observable<DefaultResponse>;

  getGenWorkersAssignedToFlow(data: GetGenWorkersAssignedToFlowRequest): Observable<GetGenWorkersAssignedToFlowResponse>;
  genWorkerDisconnect(data: GenWorkerDisconnectRequest): Observable<DefaultResponse>;


  getTask(data: GetTaskByIdRequest): Observable<FindTaskResponse>;
}