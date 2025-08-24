import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project', required: true })
  projectId!: Types.ObjectId;

  @Prop({ type: Object, required: true })
  flowName: string;

  @Prop({ type: Object, required: true })
  path: string;

  @Prop({ type: Object, required: true })
  data: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'GenWorker'})
  isProcessingBy!: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
