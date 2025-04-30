import { Types } from 'mongoose'

export type HotDealStatus = 'Active' | 'Scheduled' | 'Expired'

export interface HotDeal {
  _id: string
  name: string
  description: string
  product: {
    _id: string
    name: string
    images: string[]
    price: number
    status: string
  }
  originalPrice: number
  discountedPrice: number
  discount: string
  startDate: string
  endDate: string
  status: HotDealStatus
  timeLeft: string
  createdAt: string
  updatedAt: string
}

export interface HotDealDocument {
  _id: Types.ObjectId
  name: string
  description: string
  product: Types.ObjectId | any
  originalPrice: number
  discountedPrice: number
  discount: string
  startDate: Date
  endDate: Date
  status: HotDealStatus
  createdAt: Date
  updatedAt: Date
  __v: number
}