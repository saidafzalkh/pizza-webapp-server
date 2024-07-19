import { Command, Ctx, Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { BONUS_AMOUNT } from 'src/app.constants';
import { TelegrafContext } from 'src/common/interfaces/context.interface';
import { WEBAPP_INLINE_BUTTON } from 'src/common/layouts/keyboard';
import { UsersService } from 'src/users/users.service';
import { Logger } from '@nestjs/common';

@Update()
export class ShopUpdate {
  constructor(
    private readonly userService: UsersService,
    private readonly logger: Logger,
  ) {}

  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    try {
      const sender = ctx.from;
      if (!sender) {
        this.logger.warn('Received start command from an unknown sender.');
        return;
      }

      const user = await this.userService.findOne(sender.id);

      if (user) {
        await ctx.replyWithHTML(
          `Welcome back ${this.escapeHTML(sender.first_name)}`,
          {
            reply_markup: {
              ...WEBAPP_INLINE_BUTTON,
            },
          },
        );
      } else {
        const newUser = await this.userService.createUser({
          name: sender.first_name,
          username: sender.username,
          telegramId: sender.id,
          bonus: BONUS_AMOUNT,
        });

        await ctx.replyWithHTML(
          `Welcome new user ${this.escapeHTML(newUser.name)}`,
          {
            reply_markup: {
              ...WEBAPP_INLINE_BUTTON,
            },
          },
        );
      }
    } catch (error) {
      this.logger.error('Error handling start command', error);
      await ctx.reply(
        'An error occurred while processing your request. Please try again later.',
      );
    }
  }

  private escapeHTML(text: string): string {
    return text.replace(/[&<>"']/g, function (match) {
      const escapeMap: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return escapeMap[match];
    });
  }

  @Help()
  async help(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Open webapp to order food and use your bonuses');
  }

  @Command('webapp')
  async webappCommand(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Do you wanna order some food? Open webapp', {
      reply_markup: {
        ...WEBAPP_INLINE_BUTTON,
      },
    });
  }

  @On('sticker')
  async on(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Do you wanna order some food? Open webapp');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Hey there');
  }
}
