import { Args, Int, Parent, Query, ResolveField, Resolver, Mutation, Context } from "@nestjs/graphql";

import { User } from "./models/user.model";

import { UsersService } from "./users.service";
import { AuthService } from '../auth/auth.service';

import { RegisterInput, LoginInput, GetUserInput } from "./dto/user.input";
import { UserWithToken, Status } from "@api/users/dto/user.dto";
import { Public } from "@api/auth/auth.public";

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Query(() => User)
  async user(@Args('input') input: GetUserInput) {
    return this.usersService.findOne(input);
  }

  @Public()
  @Mutation(() => UserWithToken)
  async login(@Args('input') input: LoginInput) {
    console.log("=== Login attempt ===");
    return await this.authService.login(input);
  }

  @Public()
  @Mutation(() => UserWithToken)
  async register(@Args('input') input: RegisterInput) {
    const createdUser = await this.usersService.register(input);
    return createdUser;
  }
}
