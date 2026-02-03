import { Observable } from 'rxjs';
import { DefaultResponse, EmitRequest, JoinRequest } from './socketio';

export interface SocketioServiceClient {
  emit(data: EmitRequest): Observable<DefaultResponse>;
  join(data: JoinRequest): Observable<DefaultResponse>;
}