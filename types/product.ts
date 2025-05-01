export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock'

export interface Product {
  _id: string
  name: string
  description: string  // Remove the ? to make it required
  category: string
  price: number
  originalPrice?: number
  stock: number
  status: ProductStatus
  minOrder: string
  images: string[]
  types?: string[]
  nutritionalInfo?: string[]
  createdAt?: Date
  updatedAt?: Date
}