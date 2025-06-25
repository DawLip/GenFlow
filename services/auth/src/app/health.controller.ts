import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  getHealthRoot() {
    return { name:"auth", status: 'ok' };
  }
  @Get('health')
  getHealth() {
    return { name:"auth", status: 'ok' };
  }
}
