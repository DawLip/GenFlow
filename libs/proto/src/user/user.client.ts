import { Observable } from 'rxjs';
import { CreateRequest, CreateResponse, UpdateRequest, UpdateResponse, FindOneByIdRequest, FindOneByEmailRequest, FindResponse, RegisterGenWorkerRequest, RegisterGenWorkerResponse } from '@proto/user/user';

export interface UserServiceClient {
  create(data: CreateRequest): Observable<CreateResponse>;
  update(data: UpdateRequest): Observable<UpdateResponse>;
  findOneById(data: FindOneByIdRequest): Observable<FindResponse>;
  findOneByEmail(data: FindOneByEmailRequest): Observable<FindResponse>;

  registerGenWorker(data: RegisterGenWorkerRequest): Observable<RegisterGenWorkerResponse>;
}