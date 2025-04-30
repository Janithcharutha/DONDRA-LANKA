import mongoose from 'mongoose'
import type { HotDealDocument, HotDealStatus } from '@/types/hot-deal'

const hotDealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true,
    validate: {
      validator: async function(value: mongoose.Types.ObjectId) {
        const Product = mongoose.model('Product')
        const exists = await Product.exists({ _id: value })
        return exists !== null
      },
      message: 'Referenced product does not exist'
    }
  },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  discount: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Active', 'Scheduled', 'Expired'],
    default: 'Active',
    required: true
  }
}, {
  timestamps: true
})

const HotDeal = mongoose.models.HotDeal || mongoose.model<HotDealDocument>('HotDeal', hotDealSchema)

export default HotDeal