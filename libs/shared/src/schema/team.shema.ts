import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  owner!: string;

  @Prop({ required: true })
  members!: [string];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
