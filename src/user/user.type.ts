import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'userType ' })
export class userType {
  @Field((type) => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  password: string;
}
