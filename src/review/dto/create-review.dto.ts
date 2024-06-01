import { IsInt, IsString, IsPositive, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;
}
