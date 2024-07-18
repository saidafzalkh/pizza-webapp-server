import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
    return { ...user, telegramId: user.telegramId.toString() };
  }
}
