import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InjectBot } from 'nestjs-telegraf';
import { SHOP_BOT_NAME } from 'src/app.constants';
import { TelegrafContext } from 'src/common/interfaces/context.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Telegraf } from 'telegraf';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectBot(SHOP_BOT_NAME) private readonly bot: Telegraf<TelegrafContext>,
  ) {}

  async createUser(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data });
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      ...user,
      telegramId: user.telegramId.toString(),
    }));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { telegramId: BigInt(id) },
    });
    return user ? { ...user, telegramId: user.telegramId.toString() } : null;
  }
}
