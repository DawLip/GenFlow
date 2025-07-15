import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomMailProvider {
  async sendMail({ to, subject, body }: { to: string; subject: string; body: string }) {
    console.log(`Sending email to ${to}: [${subject}] ${body}`);
  }
}