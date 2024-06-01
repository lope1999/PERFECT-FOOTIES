import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  findAll(productId: number): Promise<Review[]> {
    return this.reviewRepository.find({ where: { product: { id: productId } }, relations: ['user'] });
  }

  createReview(userId: number, productId: number, rating: number, comment: string): Promise<Review> {
    const review = new Review();
    review.user = { id: userId } as any;
    review.product = { id: productId } as any;
    review.rating = rating;
    review.comment = comment;
    return this.reviewRepository.save(review);
  }
}
