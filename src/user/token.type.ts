import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType({ description: 'tokenType ' })
export class tokenType {
    @Field()
    token: string;
}
