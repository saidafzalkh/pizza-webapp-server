import { Update, Ctx, Start, Help, On, Hears, Command } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/common/interfaces/context.interface';
import { ShopService } from './shop_bot.service';
import { BONUS_AMOUNT } from 'src/app.constants';
import { WEBAPP_INLINE_BUTTON } from 'src/common/layouts/keyboard';

@Update()
export class ShopUpdate {
  constructor(private service: ShopService) {}

  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    const sender = ctx.from;
    const user = await this.service.getUser(sender.id);

    if (user) {
      await ctx.reply(`Welcome back ${sender.first_name}`, {
        parse_mode: 'HTML',
        reply_markup: {
          ...WEBAPP_INLINE_BUTTON,
        },
      });
      return;
    }

    const newUser = await this.service.createUser({
      name: sender.first_name,
      username: sender.username,
      telegramId: sender.id,
      bonus: BONUS_AMOUNT,
    });

    await ctx.reply(`Welcome new user ${newUser.name}`, {
      parse_mode: 'HTML',
      reply_markup: {
        ...WEBAPP_INLINE_BUTTON,
      },
    });
  }

  @Help()
  async help(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Open webapp to order food and use your bonuses');
  }

  @Command('webapp')
  async webappCommand(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Do you wanna order some food? Open webapp', {
      parse_mode: 'HTML',
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
