import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  RegisterRequest,
  LoginRequest,
  ValidateRequest,
  AuthResponse,
  UserPayload,
} from '@proto/auth/auth';
import { AuthService } from '@auth/auth/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Register')
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return await this.authService.register(data);
  }

  @GrpcMethod('AuthService', 'Login')
  async login(data: LoginRequest): Promise<AuthResponse> {
    return await this.authService.login(data);
  }

  @GrpcMethod('AuthService', 'Validate')
  async validate(data: ValidateRequest): Promise<UserPayload> {
    return await this.authService.validate(data);
  }
}
