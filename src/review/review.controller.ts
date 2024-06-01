import { Controller, Get, Post, Body, Request, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../security/auth/jwt/jwt-auth.guard';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get(':productId')
  findAll(@Request() req, @Param('productId') productId: number) {
    return this.reviewService.findAll(productId);
  }

  @Post()
  createReview(@Request() req, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(req.user.userId, createReviewDto.productId, createReviewDto.rating, createReviewDto.comment);
  }
}
