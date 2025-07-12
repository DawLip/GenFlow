import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  owner!: string;

  @Prop({ required: true })
  team!: string;

  @Prop({ required: true })
  flows!: [Flow];
}

@Schema()
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

export const ProjectSchema = SchemaFactory.createForClass(Project);
