import { Controller, Get } from '@nestjs/common';

import { name } from '../../package.json';
import { service_name } from '@shared/service_name'

const s_name = service_name(name);

@Controller()
export class HealthController {
  @Get('h')
  getHealthRoot() {
    return { name: s_name, status: 'ok' };
  }
  @Get('health')
  getHealth() {
    return { name: s_name, status: 'ok' };
  }
}
