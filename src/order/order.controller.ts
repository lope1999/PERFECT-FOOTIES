import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../security/auth/jwt/jwt-auth.guard';
import { OrderService } from './order.service';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@Request() req) {
    return this.orderService.createOrder(req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.orderService.findAll(req.user.userId);
  }
}
