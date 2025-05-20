import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Edge } from './edge.model';
import { Node } from './node.model';

@ObjectType()
@Schema()
export class Flow {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  @Prop()
  flowId: number;

  @Field()
  @Prop()
  flowName: string;

  @Field(() => [Node])
  @Prop({ type: Array })
  nodes: Node[];

  @Field(() => [Edge])
  @Prop({ type: Array })
  edges: Edge[];
}

export const FlowSchema = SchemaFactory.createForClass(Flow);