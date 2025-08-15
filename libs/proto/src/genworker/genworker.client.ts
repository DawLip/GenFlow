import { Observable } from 'rxjs';
import { CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindResponse, DefaultResponse, RegisterRequest, EnqueueRequest, DequeueRequest, DequeueResponse } from '@proto/genworker/genworker';

export interface GenWorkerServiceClient {
  create(data: CreateRequest): Observable<CreateResponse>;
  update(data: UpdateRequest): Observable<UpdateResponse>;
  findOneById(data: FindOneByIdRequest): Observable<FindResponse>;

  register(data: RegisterRequest): Observable<DefaultResponse>;

  enqueue(data: EnqueueRequest): Observable<DefaultResponse>;
  dequeue(data: DequeueRequest): Observable<DequeueResponse>;
}