import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowResolver } from './flow.resolver';
import { Flow, FlowSchema } from './models/flow.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flow.name, schema: FlowSchema }]),
  ],
  providers: [FlowService, FlowResolver],
  exports: [FlowService],
})
export class FlowModule {}
