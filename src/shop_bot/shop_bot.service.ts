import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { SHOP_BOT_NAME } from 'src/app.constants';
import { TelegrafContext } from 'src/common/interfaces/context.interface';
import { Telegraf } from 'telegraf';

@Injectable()
export class ShopService implements OnModuleInit {
  private readonly logger = new Logger(ShopService.name);

  constructor(
    @InjectBot(SHOP_BOT_NAME) private readonly bot: Telegraf<TelegrafContext>,
  ) {}

  async onModuleInit() {
    try {
      await this.bot.telegram.setMyCommands([
        { command: 'start', description: 'Start the bot' },
        { command: 'help', description: 'List of commands' },
        { command: 'webapp', description: 'Open web app' },
      ]);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
