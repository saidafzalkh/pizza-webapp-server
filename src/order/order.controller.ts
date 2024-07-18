import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.service.create(createOrderDto);
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
