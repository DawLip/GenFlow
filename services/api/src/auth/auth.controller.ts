import { Controller, Post, Body, Req } from '@nestjs/common';
import { Public } from '@api/guards/auth.public';
import { ApiAuthService } from '@api/auth/auth.service';
import { LoginRequest, RegisterRequest, SendVerificationEmailRequest, VerifyEmailRequest } from '@proto/auth/auth';
import { AuthenticatedRequest } from '@api/types/authenticated-request';

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

  @Post('verify-email')
  verifyEmail(@Body() body: VerifyEmailRequest, @Req() req: AuthenticatedRequest) {
    return this.authService.verifyEmail(body, req);
  }

  @Post('send-verification-email')
  sendVerificationEmail(@Body() body: SendVerificationEmailRequest, @Req() req: AuthenticatedRequest) {
    return this.authService.sendVerificationEmail(body, req);
  }
}