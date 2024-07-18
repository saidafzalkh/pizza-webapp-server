import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async findOne(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
