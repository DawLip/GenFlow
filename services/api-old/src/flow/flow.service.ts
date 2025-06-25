import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flow } from './models/flow.model';
import { Model } from 'mongoose';
import * as amqp from 'amqplib';
import { QueueService } from 'services/api-old/src/queue/queue.service';

@Injectable()
export class FlowService {
  constructor(
    @InjectModel(Flow.name) private flowModel: Model<Flow>,
    private readonly queueService: QueueService
  ) { }

  async test(input) {
    console.log("=== TEST ===");
    return {};
  }
  async findAll(): Promise<Flow[]> {
    return await this.flowModel.find().exec();
  }

  async executeFlow({ nodes, edges }) {
    console.log("=== executeFlow ===");
    this.queueService.sendTask("test");
  }
}
