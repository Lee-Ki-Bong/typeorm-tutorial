import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { EntityManager, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create/create-product.dto';
import { UpdateProductDto } from './dto/update/update-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(Product)
    private readonly prdRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = plainToInstance(Product, createProductDto);
    const newProduct = await this.prdRepo.save(product);
    return newProduct;
  }

  async findAll() {
    const productList = await this.prdRepo.find({
      relations: {
        p_product_detail: true,
        p_product_options: true,
        p_product_tags: true,
      },
    });
    return productList;
  }

  async findOne(id: number) {
    const product = await this.prdRepo.findOne({
      where: { p_id: id },
      relations: {
        p_product_detail: true,
        p_product_options: true,
        p_product_tags: true,
      },
    });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const res = await this.entityManager.transaction(async (entityManager) => {
      /**
      복잡한 요구사항이 발생할 경우엔 여러 레포지토리들을 각각 불러와 작업하여 여러 save or update 호출
      const prdRepo = entityManager.withRepository(this.prdRepo); // 하나의 트랜잭션 키로 레포지토리 등록.
      const product = await prdRepo.findOneBy({ p_id: id });
      */

      const updateProduct = plainToInstance(Product, updateProductDto);
      updateProduct.p_id = id;
      const newProduct = await entityManager.save(updateProduct);
      return newProduct;
    });
    return res;
  }

  async remove(id: number) {
    return await this.prdRepo.delete(id);
  }
}
