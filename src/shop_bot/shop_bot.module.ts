import { Logger, Module } from '@nestjs/common';
import { ShopService } from './shop_bot.service';
import { ShopUpdate } from './shop_bot.update';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  providers: [ShopService, ShopUpdate, UsersService, Logger],
  controllers: [],
})
export class ShopModule {}
