import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type GenWorkerDocument = GenWorker & Document;

@Schema()
export class GenWorker {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  path!: string;
  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', default: null })
  ownerId!: Types.ObjectId;

  @Prop({ required: true, default: false })
  isActive!: boolean;

}
export const GenWorkerSchema = SchemaFactory.createForClass(GenWorker);
