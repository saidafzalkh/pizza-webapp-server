import { Injectable, Logger } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    try {
      return await this.prisma.category.create({ data });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findOne(id: number): Promise<Category | null> {
    try {
      return this.prisma.category.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async update(
    id: number,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    try {
      return await this.prisma.category.update({ where: { id }, data });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async remove(id: number): Promise<Category> {
    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
