import { Args, Int, Parent, Query, ResolveField, Resolver, Mutation, Context } from "@nestjs/graphql";

import { FlowService } from "./flow.service";
import { Flow } from "./models/flow.model";


@Resolver(() => Flow)
export class FlowResolver {
  constructor(
    private flowService: FlowService,
  ) {}

  @Query(() => [Flow])
  async allFlows() {
    return this.flowService.findAll();
  }
}
