import { Types } from 'mongoose'
import type { FlattenMaps } from 'mongoose'

// Base interface for MongoDB documents
export interface MongoDocument {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  __v: number
}

// Product interfaces
export interface LeanProduct extends MongoDocument {
  name: string
  images: string[]
  price: number
  category: string
}

export type LeanProductDoc = FlattenMaps<LeanProduct>

// Hot Deal interfaces
export interface LeanHotDeal extends MongoDocument {
  name: string
  description: string
  product: LeanProduct
  originalPrice: number
  discountedPrice: number
  discount: string
  startDate: Date
  endDate: Date
  status: 'Active' | 'Scheduled' | 'Expired'
}

export type LeanHotDealDoc = FlattenMaps<LeanHotDeal>

// News Banner interfaces
export interface NewsBannerDocument extends MongoDocument {
  title: string
  content: string
  imageUrl?: string
  startDate: Date
  endDate: Date
  status: 'Active' | 'Scheduled' | 'Expired'
}

export type LeanNewsBannerDoc = FlattenMaps<NewsBannerDocument>