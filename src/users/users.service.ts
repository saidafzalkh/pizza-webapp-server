import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InjectBot } from 'nestjs-telegraf';
import { SHOP_BOT_NAME } from 'src/app.constants';
import { TelegrafContext } from 'src/common/interfaces/context.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Telegraf } from 'telegraf';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectBot(SHOP_BOT_NAME) private readonly bot: Telegraf<TelegrafContext>,
  ) {}

  async createUser(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return users.map((user) => ({
        ...user,
        telegramId: user.telegramId.toString(),
      }));
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { telegramId: BigInt(id) },
      });
      return user ? { ...user, telegramId: user.telegramId.toString() } : null;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
