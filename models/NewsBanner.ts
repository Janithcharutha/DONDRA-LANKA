import mongoose from 'mongoose'

const newsBannerSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Scheduled', 'Expired'],
    default: 'Active'
  }
}, {
  timestamps: true,
  strict: true // This ensures no additional fields are allowed
})

const NewsBanner = mongoose.models.NewsBanner || mongoose.model('NewsBanner', newsBannerSchema)
export default NewsBanner