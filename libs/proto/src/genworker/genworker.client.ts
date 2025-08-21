import { Observable } from 'rxjs';
import { CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse, DefaultResponse, RegisterRequest, EnqueueRequest, GenWorkerAssignRequest, GenWorkerDisconnectRequest, FinishTaskRequest, FinishPartialTaskRequest, GetGenWorkersAssignedToFlowRequest, GetGenWorkersAssignedToFlowResponse } from '@proto/genworker/genworker';

export interface GenWorkerServiceClient {
  // CRUD
  create(data: CreateRequest): Observable<CreateResponse>;
  update(data: UpdateRequest): Observable<UpdateResponse>;
  findOneById(data: FindOneByIdRequest): Observable<FindResponse>;

  // Special
  enqueueTask(data: EnqueueRequest): Observable<DefaultResponse>;
  finishPartialTask(data: FinishPartialTaskRequest): Observable<DefaultResponse>;
  finishTask(data: FinishTaskRequest): Observable<DefaultResponse>;

  register(data: RegisterRequest): Observable<DefaultResponse>;
  genWorkerAssign(data: GenWorkerAssignRequest): Observable<DefaultResponse>;
  getGenWorkersAssignedToFlow(data: GetGenWorkersAssignedToFlowRequest): Observable<GetGenWorkersAssignedToFlowResponse>;
  genWorkerDisconnect(data: GenWorkerDisconnectRequest): Observable<DefaultResponse>;
}