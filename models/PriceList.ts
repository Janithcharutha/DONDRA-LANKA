import mongoose from 'mongoose'

const priceListSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  timestamps: true
})

const PriceList = mongoose.models.PriceList || mongoose.model('PriceList', priceListSchema)

export default PriceList