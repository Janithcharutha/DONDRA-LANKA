import mongoose from 'mongoose';

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
  }
}, {
  timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;