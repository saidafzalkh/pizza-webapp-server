import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(ProductsService.name);

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    try {
      const product = await this.prisma.product.create({ data });
      this.logger.log('Product created successfully');
      return product;
    } catch (error) {
      this.logger.error('Error creating product:', error);
      throw new Error('Error creating product');
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.prisma.product.findMany();
      this.logger.log('Products list sended successfully');
      return products;
    } catch (error) {
      this.logger.error('Error getting products list:', error);
      throw new Error('Error getting products list');
    }
  }

  async findOne(id: number): Promise<Product | null> {
    try {
      const product = this.prisma.product.findUnique({ where: { id } });
      this.logger.log('Product found successfully');
      return product;
    } catch (error) {
      this.logger.error('Error finding product by id:', error);
      throw new Error('Error finding product by id');
    }
  }

  async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    try {
      const product = await this.prisma.product.update({ where: { id }, data });
      this.logger.log('Product updated successfully:', product);
      return product;
    } catch (error) {
      this.logger.error('Error updating product:', error);
      throw new Error('Error updating product');
    }
  }

  async remove(id: number): Promise<Product> {
    try {
      const product = await this.prisma.product.delete({ where: { id } });
      this.logger.log('Product removed successfully:', product);
      return product;
    } catch (error) {
      this.logger.error('Error removing product:', error);
      throw new Error('Error removing product');
    }
  }
}
