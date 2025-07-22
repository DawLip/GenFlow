import { Observable } from 'rxjs';
import type { LoginRequest, RegisterRequest, ValidateRequest, UserPayload, AuthResponse, VerifyEmailResponse, VerifyEmailRequest, SendVerificationEmailResponse, SendVerificationEmailRequest } from '../../../../libs/proto/src/auth/auth';

export interface AuthServiceClient {

  register(request: RegisterRequest): Observable<AuthResponse>;
  login(request: LoginRequest): Observable<AuthResponse>;
  validate(request: ValidateRequest): Observable<UserPayload>;
  verifyEmail(request: VerifyEmailRequest): Observable<VerifyEmailResponse>;
  sendVerificationEmail(request: SendVerificationEmailRequest): Observable<SendVerificationEmailResponse>;
}