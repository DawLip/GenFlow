import { Args, Int, Parent, Query, ResolveField, Resolver, Mutation, Context } from "@nestjs/graphql";

import { FlowService } from "./flow.service";
import { Flow } from "./models/flow.model";
import { Node } from "./models/node.model"
import { Edge } from "./models/edge.model";
import { Status } from './dto/return.types'
import { ExecuteFlowInput } from "./dto/input.types";
import { Public } from "@api/auth/auth.public";


@Resolver(() => Flow)
export class FlowResolver {
  constructor(
    private flowService: FlowService,
  ) {}

  @Query(() => [Flow])
  async allFlows() {
    return this.flowService.findAll();
  }

  @Public()
  @Mutation(() => Status)
    async executeFlow(@Args('input') input: ExecuteFlowInput) {
      this.flowService.executeFlow(input);
      return { status: "SUCCESS" };
    }
}
