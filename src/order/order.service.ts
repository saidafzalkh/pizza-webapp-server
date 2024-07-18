import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const {
      telegramId,
      userPhone,
      useBonus,
      userBonus,
      userAddress,
      orderItems,
    } = createOrderDto;

    let totalAmount = orderItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    if (useBonus) {
      totalAmount -= userBonus;
      this.prisma.user.update({
        where: { telegramId: BigInt(telegramId) },
        data: { bonus: 0 },
      });
    }

    return this.prisma.order.create({
      data: {
        user: { connect: { telegramId: BigInt(telegramId) } },
        userPhone,
        userAddress,
        useBonus,
        totalAmount,
        orderItems: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  async findOne(id: number): Promise<Array<Order> | null> {
    return this.prisma.order.findMany({
      where: { user: { telegramId: BigInt(id) } },
    });
  }
}
