import { Command, Ctx, Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { BONUS_AMOUNT } from 'src/app.constants';
import { TelegrafContext } from 'src/common/interfaces/context.interface';
import { WEBAPP_INLINE_BUTTON } from 'src/common/layouts/keyboard';
import { UsersService } from 'src/users/users.service';

@Update()
export class ShopUpdate {
  constructor(private readonly userService: UsersService) {}

  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    const sender = ctx.from;
    const user = await this.userService.findOne(sender.id);

    if (user) {
      await ctx.replyWithHTML(`Welcome back ${sender.first_name}`, {
        reply_markup: {
          ...WEBAPP_INLINE_BUTTON,
        },
      });
      return;
    }

    const newUser = await this.userService.createUser({
      name: sender.first_name,
      username: sender.username,
      telegramId: sender.id,
      bonus: BONUS_AMOUNT,
    });

    await ctx.replyWithHTML(`Welcome new user ${newUser.name}`, {
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
