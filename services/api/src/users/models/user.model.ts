import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@ObjectType()  
@Schema()     
export class User {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  surname: string;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);