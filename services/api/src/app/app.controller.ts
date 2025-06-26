import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hero/:id')
  getHero(@Param('id') id: string) {
    return this.appService.getHero(Number(id));
  }
}
