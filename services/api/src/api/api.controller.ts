import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiService } from '@api/api/api.service';
import { AuthGuard } from '@api/guards/auth.guard';
import {
  RegisterRequest,
  LoginRequest,
  ValidateRequest,
  AuthResponse,
  UserPayload,
} from '@proto/lib/auth';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('login')
  async login(@Body() body: LoginRequest) {
    return this.apiService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body:any) {
    console.log("ytred")
    console.log(body)
    // return this.apiService.register("a", "a", "a");
    return {test:"true"}
  }

  @UseGuards(AuthGuard)
  @Get('test2')
  async test2() {
    return { message: 'Protected route works!' };
  }
}
