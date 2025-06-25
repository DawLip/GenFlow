import { InputType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class ExecuteFlowInput {
  @Field(() => [GraphQLJSON])
  nodes: any[];

  @Field(() => [GraphQLJSON])
  edges: any[];
}