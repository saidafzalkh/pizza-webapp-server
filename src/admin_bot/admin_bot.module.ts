import { Module } from '@nestjs/common';
import { AdminService } from './admin_bot.service';
import { AdminUpdate } from './admin_bot.update';

@Module({
  providers: [AdminService, AdminUpdate],
})
export class AdminModule {}
