export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  images: string[];
  description?: string;
  minOrder?: string;
  types?: string[];
  weightOptions?: string[];
  nutritionalInfo?: string[];
  storageInstructions?: string;
  createdAt?: Date;
  updatedAt?: Date;
}