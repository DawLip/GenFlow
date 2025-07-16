import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '@api-test/guards/auth.public';
import { ApiAuthService } from '@api-test/auth/auth.service';
import { LoginRequest, RegisterRequest } from '@proto/auth/auth';

@Controller('auth')
export class ApiAuthController {
  constructor(private readonly authService: ApiAuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: LoginRequest) {
    return this.authService.login(body);
  }

  @Public()
  @Post('register')
  register(@Body() body: RegisterRequest) {
    return this.authService.register(body);
  }
}