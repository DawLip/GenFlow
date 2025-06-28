import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiService } from '@api/api/api.service';
import { AuthGuard } from '@api/guards/auth.guard';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('test')
  test() {
    return this.apiService.login("a", "a");
  }

  @Get('register')
  register() {
    return this.apiService.register("a", "a", "a");
  }

  @UseGuards(AuthGuard)
  @Get('test2')
  test2() {
    return { message: 'Protected route works!' };
  }
}
