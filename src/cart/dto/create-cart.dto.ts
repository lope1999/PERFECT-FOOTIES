import { IsInt, IsPositive } from 'class-validator';

export class CreateCartDto {}

export class AddToCartDto {
    @IsInt()
    @IsPositive()
    productId: number;
  
    @IsInt()
    @IsPositive()
    quantity: number;
  }