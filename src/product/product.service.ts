import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ulid } from 'ulid';

export interface IProduct {
  id?: string;
  name: string;
  content: string;
  price: number;
  category: string;
  viewCount: number;
}

@Injectable()
export class ProductService {
  products: IProduct[] = [];

  getProducts(): IProduct[] {
    return this.products;
  }

  getProduct(id: string): IProduct {
    const idx: number = this.products.findIndex((product) => product.id === id);
    if (idx === -1) {
      throw new NotFoundException(`해당 ${id} id의 상품을 찾을 수 없습니다.`);
    }
    this.products[idx] = {
      ...this.products[idx],
      viewCount: ++this.products[idx].viewCount,
    };
    return this.products[idx];
  }

  createProduct(product: IProduct) {
    if (product.viewCount) {
      throw new BadRequestException('해당 인자를 접근할 수 없습니다.');
    }
    product.id = ulid();
    product.viewCount = 0;
    this.products.push(product);
    return product;
  }

  updateProduct(id: string, product: IProduct): IProduct {
    const idx: number = this.products.findIndex((product) => product.id === id);
    if (idx === -1) {
      throw new NotFoundException(`해당 ${id} id의 상품을 찾을 수 없습니다.`);
    }
    delete product.id;
    this.products[idx] = { ...this.products[idx], ...product };
    return this.products[idx];
  }

  deleteProduct(id: string): IProduct {
    const idx: number = this.products.findIndex((product) => product.id === id);
    if (idx === -1) {
      throw new NotFoundException(`해당 ${id} id의 상품을 찾을 수 없습니다.`);
    }
    const exProduct = this.products[idx];
    this.products.splice(idx, 1);
    return exProduct;
  }
}
