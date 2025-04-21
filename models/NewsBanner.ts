import mongoose from 'mongoose'

const newsBannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
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

const NewsBanner = mongoose.models.NewsBanner || mongoose.model('NewsBanner', newsBannerSchema)
export default NewsBanner