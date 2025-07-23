import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Flow {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  flowData!: string;

  @Prop({ required: true })
  type!: string;
}

const FlowSchema = SchemaFactory.createForClass(Flow);

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  owner!: Types.ObjectId;

  @Prop({ type: [FlowSchema], required: true })
  flows!: Flow[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
