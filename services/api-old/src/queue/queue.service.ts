import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class QueueService implements OnModuleInit {
  private channel: amqp.Channel;
  private readonly queueName = 'task_queue';

  async connectWithRetry() {
    const maxRetries = 5;
    for (let i = 0; i < maxRetries; i++) {
      try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL || '');
        this.channel = await connection.createChannel();
        await this.channel.assertQueue(this.queueName, { durable: true });
        console.log('Connected to RabbitMQ');
        return;
      } catch (err) {
        console.warn(`RabbitMQ not ready (attempt ${i + 1}), retrying...`);
        await new Promise((res) => setTimeout(res, 5000));
      }
    }
    throw new Error('Failed to connect to RabbitMQ after retries');
  }

  async onModuleInit() {
    await this.connectWithRetry();
  }

  async sendTask(task: any) {
    const buffer = Buffer.from(JSON.stringify(task));
    this.channel.sendToQueue(this.queueName, buffer, {
      persistent: true,
    });
    console.log('Sent task to queue:', task);
  }
}