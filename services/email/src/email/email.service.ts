import { Injectable } from '@nestjs/common';

import { PinoLogger } from 'nestjs-pino';

import { CustomMailProvider } from './custom.provider';



@Injectable()
export class EmailService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly provider: CustomMailProvider
  ) {}

  async send(data: { to: string; subject: string; body: string }) {
    this.logger.info({data }, "ok");
    return this.provider.sendMail(data);
  }
}
