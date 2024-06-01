import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private cartService: CartService,
  ) {}

  async createOrder(userId: number): Promise<Order> {
    const cartItems = await this.cartService.findAll(userId);
    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    const order = new Order();
    order.user = { id: userId } as any;
    order.totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    order.status = 'Pending';
    const savedOrder = await this.orderRepository.save(order);

    const orderItems = cartItems.map(cartItem => {
      const orderItem = new OrderItem();
      orderItem.order = savedOrder;
      orderItem.product = cartItem.product;
      orderItem.quantity = cartItem.quantity;
      orderItem.price = cartItem.product.price;
      return orderItem;
    });

    await this.orderItemRepository.save(orderItems);

    await this.cartService.clearCart(userId);

    return this.orderRepository.findOne({ where: { id: savedOrder.id }, relations: ['items', 'items.product'] });
  }

  findAll(userId: number): Promise<Order[]> {
    return this.orderRepository.find({ where: { user: { id: userId } }, relations: ['items', 'items.product'] });
  }
}
