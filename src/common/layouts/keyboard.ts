import { WEBAPP } from 'src/app.constants';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const WEBAPP_INLINE_BUTTON: InlineKeyboardMarkup = {
  inline_keyboard: [[{ text: 'Open shop', web_app: { url: WEBAPP } }]],
};
