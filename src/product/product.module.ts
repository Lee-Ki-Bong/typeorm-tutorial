import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductDetail } from './entities/product-detail.entity';
import { ProductOption } from './entities/product-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductDetail, ProductOption])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
