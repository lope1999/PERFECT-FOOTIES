import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  findAll(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({ where: { user: { id: userId } }, relations: ['product'] });
  }

  async addToCart(userId: number, productId: number, quantity: number): Promise<Cart> {
    const cartItem = new Cart();
    cartItem.user = { id: userId } as any;
    cartItem.product = { id: productId } as any;
    cartItem.quantity = quantity;
    return this.cartRepository.save(cartItem);
  }

  async removeFromCart(userId: number, productId: number): Promise<void> {
    await this.cartRepository.delete({ user: { id: userId }, product: { id: productId } });
  }

  async clearCart(userId: number): Promise<void> {
    await this.cartRepository.delete({ user: { id: userId } });
  }
}
