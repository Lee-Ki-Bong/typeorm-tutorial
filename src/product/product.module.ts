import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductDetail } from './entities/product-detail.entity';
import { ProductOption } from './entities/product-option.entity';
import { ProductTag } from './entities/product-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductDetail,
      ProductOption,
      ProductTag,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
