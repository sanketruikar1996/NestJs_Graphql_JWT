import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { tokenType } from './token.type';
import { UserService } from './user.service';
import { userType } from './user.type';

@Resolver((of) => userResolver)
export class userResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => userType)
  getUser() {}

  @Mutation((returns) => userType)
  signUp(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('phoneNumber') phoneNumber: string,
    @Args('password') password: string,
  ) {
    return this.userService.createUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    );
  }

  @Query((returns) => tokenType)
  signIn(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.signIn(email, password);
  }
}
