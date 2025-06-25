import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowResolver } from './flow.resolver';
import { Flow, FlowSchema } from './models/flow.model';
import { QueueModule } from 'services/api-old/src/queue/queue.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flow.name, schema: FlowSchema }]),
    QueueModule
  ],
  providers: [FlowService, FlowResolver],
  exports: [FlowService],
})
export class FlowModule {}
