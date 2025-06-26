import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('h')
  getHealthRoot() {
    return { name:"gateway", status: 'ok' };
  }
  @Get('health')
  getHealth() {
    return { name:"gateway", status: 'ok' };
  }
}
