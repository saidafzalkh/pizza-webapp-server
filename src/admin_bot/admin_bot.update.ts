import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
import { ADMIN_LIST } from 'src/app.constants';
import { TelegrafContext } from 'src/common/interfaces/context.interface';

@Update()
export class AdminUpdate {
  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    const user = ctx.from;

    if (!ADMIN_LIST.includes(user.id)) {
      await ctx.replyWithHTML(
        `Hello, ${user.first_name}. \n You are not an admin of this bot. You telegram ID is: <code>${user.id}</code> send this to developer and ask make you an admin`,
      );
      return;
    }

    await ctx.reply('welcome admin');
  }

  @Help()
  async help(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Hey there');
  }
}
