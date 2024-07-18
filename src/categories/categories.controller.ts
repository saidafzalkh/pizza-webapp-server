import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Post('create')
  create(@Body() createCategoryDto: Prisma.CategoryCreateInput) {
    return this.service.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: Prisma.CategoryUpdateInput,
  ) {
    return this.service.update(+id, updateCategoryDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
