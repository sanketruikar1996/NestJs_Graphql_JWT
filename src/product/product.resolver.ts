import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { authGaurd } from 'src/auth/auth.gaurd';
import { ProductService } from './product.service';
import { productType } from './product.type';

@Resolver((of) => productType)
@UseGuards(authGaurd)
export class productResolver {
  constructor(private productService: ProductService) {}

  @Query((returns) => productType)
  async getProduct() {
    await this.productService.getProduct();
  }

  @Mutation((returns) => productType)
  add(
    @Args('productName') productName: string,
    @Args('price') price: string,
    @Args('description') description: string,
    @Args('tags') tags: string,
  ) {
    return this.productService.createProduct(
      productName,
      price,
      description,
      tags,
    );
  }
}
