import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { ShopModule } from './shop_bot/shop_bot.module';
import { AdminModule } from './admin_bot/admin_bot.module';
import { PrismaModule } from './prisma/prisma.module';
import { ADMIN_BOT_NAME, SHOP_BOT_NAME } from './app.constants';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRoot({
      botName: SHOP_BOT_NAME,
      token: process.env.SHOP_BOT_TOKEN,
      include: [ShopModule],
    }),
    TelegrafModule.forRoot({
      botName: ADMIN_BOT_NAME,
      token: process.env.ADMIN_BOT_TOKEN,
      include: [AdminModule],
    }),
    ShopModule,
    AdminModule,
    PrismaModule,
    CategoriesModule,
    ProductsModule,
    UsersModule,
    OrderModule,
  ],
})
export class AppModule {}
