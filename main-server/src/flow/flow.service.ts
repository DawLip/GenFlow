import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flow } from './models/flow.model';
import { Model } from 'mongoose';

@Injectable()
export class FlowService {
  constructor(
      @InjectModel(Flow.name) private flowModel: Model<Flow>,
    ) {}

  async test(input: any): Promise<any> {
    console.log("=== TESTR ===");
    return {};
  }
  async findAll(): Promise<Flow[]> {
    return this.flowModel.find().exec();
  }
}
