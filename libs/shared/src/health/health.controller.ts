import { Controller, Get } from '@nestjs/common';

export function createHealthController(serviceName: string) {
  @Controller()
  class HealthController {
    public readonly name = serviceName;

    @Get('h')
    root() {
      return { name: this.name, status: 'ok' };
    }

    @Get('health')
    health() {
      return { name: this.name, status: 'ok' };
    }
  }

  return HealthController;
}