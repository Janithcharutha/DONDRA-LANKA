import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  images: [{ 
    type: String 
  }],
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'In Stock',
    required: true
  },
  minOrder: {
    type: String,
    required: true,
    default: '1kg'
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: [1, 'Description cannot be empty']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product