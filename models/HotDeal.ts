import mongoose from 'mongoose'

const hotDealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
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
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Add virtual field for timeLeft
hotDealSchema.virtual('timeLeft').get(function() {
  const now = new Date()
  const diff = this.endDate.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

  if (days < 0) return 'Expired'
  if (days === 0) return 'Ends today'
  if (days === 1) return '1 day'
  return `${days} days`
})

// Add pre-save hook for debugging
hotDealSchema.pre('save', function(next) {
  console.log('Saving hot deal:', this)
  next()
})

const HotDeal = mongoose.models.HotDeal || mongoose.model('HotDeal', hotDealSchema)
export default HotDeal