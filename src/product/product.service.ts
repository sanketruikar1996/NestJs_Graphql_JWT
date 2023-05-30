import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { productEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(productEntity)
    private productRepo: Repository<productEntity>,
  ) {}

  async getProduct() {
    return await this.productRepo.find();
  }

  async createProduct(
    productName: string,
    price: string,
    description: string,
    tags: string,
  ) {
    const product = new productEntity();

    const key=`user`

    product.productName = productName;
    product.price = price;
    product.description = description;
    product.tags = tags;
    return await this.productRepo.save(product);
  }
}
