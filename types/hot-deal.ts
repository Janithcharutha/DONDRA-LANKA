import type { Product } from './product'

export interface HotDeal {
  _id: string;
  name: string;
  description: string;
  product: Product;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Scheduled' | 'Expired';
  timeLeft?: string;
  createdAt: string;
  updatedAt: string;
}