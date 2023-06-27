import { CreateProductDetailDto } from './create-product-detail';

export class CreateProductDto {
  name: string;
  price: number;
  product_detail: CreateProductDetailDto;
}
