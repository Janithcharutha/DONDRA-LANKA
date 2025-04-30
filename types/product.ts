export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock'

export interface Product {
  _id: string
  name: string
  description?: string
  category: string
  price: number
  originalPrice?: number
  stock: number
  status: ProductStatus
  minOrder: string
  images: string[]
  // Add new properties
  types?: string[]
  weightOptions?: string[]
  nutritionalInfo?: string[]
  storageInstructions?: string
  createdAt?: Date
  updatedAt?: Date
}