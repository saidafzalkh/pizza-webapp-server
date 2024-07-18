import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { SHOP_BOT_NAME } from 'src/app.constants';
import { TelegrafContext } from 'src/common/interfaces/context.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Telegraf } from 'telegraf';

@Injectable()
export class ShopService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    @InjectBot(SHOP_BOT_NAME) private readonly bot: Telegraf<TelegrafContext>,
  ) {}

  async onModuleInit() {
    await this.bot.telegram.setMyCommands([
      { command: 'start', description: 'Start the bot' },
      { command: 'help', description: 'List of commands' },
      { command: 'webapp', description: 'Open web app' },
    ]);
  }
}
