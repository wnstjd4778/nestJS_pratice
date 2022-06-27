import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IProduct, ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAllProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Post()
  createProduct(@Body() product: IProduct) {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: IProduct) {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
