import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('h')
  getHealthRoot() {
    return { name:"auth", status: 'ok' };
  }
  @Get('health')
  getHealth() {
    return { name:"auth", status: 'ok' };
  }
}
