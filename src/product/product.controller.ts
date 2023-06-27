import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create/create-product.dto';
import { UpdateProductDto } from './dto/update/update-product.dto';
import { BongFaker } from 'src/library/bongFaker';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('test')
  async getTestData() {
    const productName = BongFaker.product();
    return {
      p_name: productName,
      p_price: BongFaker.clearPrice(4, 5),
      p_product_detail: {
        pd_description: BongFaker.adjective(),
      },
      p_product_options: [
        {
          po_name: productName + ' 옵션1',
          po_value: productName + ' 옵션값1',
        },
        {
          po_name: productName + ' 옵션2',
          po_value: productName + ' 옵션값2',
        },
      ],
    };
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
