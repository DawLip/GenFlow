import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('h')
  getHealthRoot() {
    return { name:"graphql", status: 'ok' };
  }
  @Get('health')
  getHealth() {
    return { name:"graphql", status: 'ok' };
  }
}
