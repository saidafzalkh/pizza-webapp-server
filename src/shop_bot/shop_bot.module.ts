import { Module } from '@nestjs/common';
import { ShopService } from './shop_bot.service';
import { ShopUpdate } from './shop_bot.update';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ShopService, ShopUpdate],
  controllers: [],
})
export class ShopModule {}
