import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  getHealthRoot() {
    return { name:"socket.io", status: 'ok' };
  }
  @Get('health')
  getHealth() {
    return { name:"socket.io", status: 'ok' };
  }
}
