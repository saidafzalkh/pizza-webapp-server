import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [PrismaModule],
})
export class CategoriesModule {}
