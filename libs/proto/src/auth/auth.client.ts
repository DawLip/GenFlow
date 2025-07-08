import { Observable } from 'rxjs';
import type { LoginRequest, RegisterRequest, ValidateRequest, UserPayload, AuthResponse } from '../../../../libs/proto/src/lib/auth';

export interface AuthServiceClient {

  register(request: RegisterRequest): Observable<AuthResponse>;
  login(request: LoginRequest): Observable<AuthResponse>;
  validate(request: ValidateRequest): Observable<UserPayload>;
}