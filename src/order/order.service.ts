import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { telegramId, userPhone, userAddress, orderItems } = createOrderDto;

    const totalAmount = orderItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    return this.prisma.order.create({
      data: {
        user: { connect: { telegramId: BigInt(telegramId) } },
        userPhone,
        userAddress,
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
