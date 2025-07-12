import { Observable } from 'rxjs';
import { CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse, CreateFlowRequest, CreateFlowResponse, UpdateFlowRequest, UpdateFlowResponse } from '@proto/project/project';

export interface ProjectServiceClient {
  create(data: CreateRequest): Observable<CreateResponse>;
  update(data: UpdateRequest): Observable<UpdateResponse>;
  findOneById(data: FindOneByIdRequest): Observable<FindResponse>;

  createFlow(data: CreateFlowRequest): Observable<CreateFlowResponse>;
  updateFlow(data: UpdateFlowRequest): Observable<UpdateFlowResponse>;
}