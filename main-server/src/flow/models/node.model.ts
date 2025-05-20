import { Field, ObjectType, ID } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class NodeData {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => GraphQLJSONObject)
  io: Record<string, any>;  

  @Field(() => GraphQLJSONObject)
  ports: Record<string, any>;  
}

@ObjectType()
export class Node {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field(() => NodeData)
  data: NodeData; 

  @Field(() => GraphQLJSONObject)
  position: Record<string, any>;  

  @Field(() => GraphQLJSONObject)
  style: Record<string, any>;  
}