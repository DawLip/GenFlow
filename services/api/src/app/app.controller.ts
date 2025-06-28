import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from '@api/app/app.service';
import { AuthGuard } from '@api/guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  test() {
    return this.appService.login("a", "a");
  }

  @UseGuards(AuthGuard)
  @Get('test2')
  test2() {
    return { message: 'Protected route works!' };
  }
}
