import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ _id: false })
export class Edge {
  @Prop({ required: true })
  id!: string;

  @Prop({ required: true })
  source!: string;

  @Prop({ required: true })
  sourceHandle!: string;

  @Prop({ required: true })
  target!: string;

  @Prop({ required: true })
  targetHandle!: string;
}
const EdgeSchema = SchemaFactory.createForClass(Edge);

@Schema({ _id: false })
export class Node {
  @Prop({ required: true })
  id!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ type: Object, required: true })
  position!: string;

  @Prop({ type: Object, required: true })
  style: string;

  @Prop({ type: Object, required: true })
  data: string;

}
const NodeSchema = SchemaFactory.createForClass(Node);

@Schema({ timestamps: true })
export class Flow {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ type: [NodeSchema], required: true })
  nodes!: Node[];

  @Prop({ type: [EdgeSchema], required: true })
  edges!: Edge[];
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
