import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Edge {
  @Field(() => ID)
  id: string;

  @Field()
  source: string;

  @Field()
  target: string;
}
