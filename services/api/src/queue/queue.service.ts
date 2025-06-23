import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class QueueService implements OnModuleInit {
  private channel: amqp.Channel;
  private readonly queueName = 'task_queue';

  async onModuleInit() {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(this.queueName, {
      durable: true,
    });
  }

  async sendTask(task: any) {
    const buffer = Buffer.from(JSON.stringify(task));
    this.channel.sendToQueue(this.queueName, buffer, {
      persistent: true,
    });
    console.log('Sent task to queue:', task);
  }
}