import type { ColumnType } from 'kysely';

export type Decimal = ColumnType<string, string | number, string | number>;

export interface Product {
  description: string;
  imageSrc: string;
  name: string;
  price: Decimal;
  productId: string;
}

export interface Review {
  productId: string;
  reviewCount: number;
  reviewId: string;
  stars: number;
}

export interface DB {
  product: Product;
  review: Review;
}
