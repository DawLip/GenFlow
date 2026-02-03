import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailConsumer {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('send_email')
  async handleSendEmail(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.emailService.send(data);
    } catch (error) {
      channel.nack(message, false, false); 
      throw error; 
    }
  }

}