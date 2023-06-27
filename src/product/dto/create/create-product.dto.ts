import { CreateProductDetailDto } from './create-product-detail.dto';
import { CreateProductOptionDto } from './create-product-option.dto';

export class CreateProductDto {
  p_name: string;
  p_price: number;
  p_product_detail: CreateProductDetailDto;
  p_product_options: CreateProductOptionDto[];
}
