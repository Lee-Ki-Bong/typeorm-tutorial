import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly prdRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = plainToInstance(Product, createProductDto);
    const newProduct = await this.prdRepo.save(product);
    return newProduct;
  }

  async findAll() {
    const productList = await this.prdRepo.find();
    return productList;
  }

  async findOne(id: number) {
    const product = await this.prdRepo.findOneBy({ id });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prdRepo.findOneBy({ id });
    const updateProduct = plainToInstance(Product, updateProductDto);
    const newProduct = await this.prdRepo.update(product.id, updateProduct);
    return newProduct;
  }

  async remove(id: number) {
    return await this.prdRepo.delete(id);
  }
}
