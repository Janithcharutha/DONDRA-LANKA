import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  originalPrice: { 
    type: Number 
  },
  stock: { 
    type: Number, 
    default: 0 
  },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'In Stock'
  },
  images: {
    type: [String],
    default: []
  },
  description: String,
  minOrder: String,
  types: {
    type: [String],
    default: []
  },
  weightOptions: {
    type: [String],
    default: []
  },
  nutritionalInfo: {
    type: [String],
    default: []
  },
  storageInstructions: String
}, {
  timestamps: true,
  versionKey: false // Disable the version key
});

// Drop existing indexes to prevent duplicate key errors
productSchema.index({}, { sparse: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;