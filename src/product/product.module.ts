import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productEntity } from './product.entity';
import { productResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
    imports:[TypeOrmModule.forFeature([productEntity])],
    providers: [ProductService,productResolver]
})
export class ProductModule {}
