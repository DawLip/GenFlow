import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema({ timestamps: true })
export class Team {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  owner!: Types.ObjectId;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User', required: true })
  members!: Types.ObjectId[];

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Project', default: [] })
  projects!: Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Genworkers'})
  master_genworker!: Types.ObjectId | null;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Genworkers', default: [] })
  storage_genworkers!: Types.ObjectId[];

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Genworkers', default: [] })
  genworkers!: Types.ObjectId[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
