import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';
import { NewUserInput } from './new-user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUserById(@Args('id', { type: () => String }) id: string) {
    // const exampleUser = new User();

    // exampleUser.id = '1'
    // exampleUser.firstName = 'Richard'
    // exampleUser.lastName = 'Li'
    // exampleUser.age = 30
    // exampleUser.createDate = new Date()

    // return exampleUser
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new NotFoundException(id);
    }

    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('newUserInput') newUserInput: NewUserInput): Promise<User> {
    const newUser = await this.userService.createUser(newUserInput);

    return newUser;
  }
}
