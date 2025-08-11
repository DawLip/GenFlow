import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true, default: false })
  emailConfirmed!: boolean;

  @Prop({ required: true })
  confirmCode!: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'GenWorker', default: [] })
  genWorkers!: Types.ObjectId[];
}
export const UserSchema = SchemaFactory.createForClass(User);
