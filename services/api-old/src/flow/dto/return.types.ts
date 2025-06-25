import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Status {
  @Field()
  status: string;
}
