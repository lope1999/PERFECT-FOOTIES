import { Controller, Get, Post, Delete, Body, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../security/auth/jwt/jwt-auth.guard';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/create-cart.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  findAll(@Request() req) {
    return this.cartService.findAll(req.user.userId);
  }

  @Post()
  addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(req.user.userId, addToCartDto.productId, addToCartDto.quantity);
  }

  @Delete()
  removeFromCart(@Request() req, @Body() body: { productId: number }) {
    return this.cartService.removeFromCart(req.user.userId, body.productId);
  }
}
