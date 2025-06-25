import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  getHealthRoot() {
    return { name:"api", status: 'ok' };
  }
  @Get('health')
  getHealth() {
    return { name:"api", status: 'ok' };
  }
}
