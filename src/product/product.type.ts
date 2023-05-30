import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'productType ' })
export class productType
{
    @Field((type) => ID)
    id: number;
  
    @Field()
    productName: string;
  
    @Field()
    price: string;
  
    @Field()
    description: string;
  
    @Field()
    tags: string;

}