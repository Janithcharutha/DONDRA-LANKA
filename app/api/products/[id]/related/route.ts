import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import { isValidObjectId, Types } from 'mongoose'
import type { Product as ProductType } from '@/types/product'

// Add interface for MongoDB document
interface MongoProduct {
  _id: Types.ObjectId;
  name: string;
  category: string;
  price: number;
  images: string[];
  minOrder?: string;
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    await connectDB()

    // Get current product with type assertion
    const currentProduct = await Product.findById(id).lean() as unknown as MongoProduct
    
    if (!currentProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Get related products with type assertion
    const relatedProducts = await Product.find({
      category: currentProduct.category,
      _id: { $ne: new Types.ObjectId(currentProduct._id.toString()) }
    }).lean() as unknown as MongoProduct[]

    // Format the response
    const formattedProducts = relatedProducts.map(product => ({
      _id: product._id.toString(),
      name: product.name,
      category: product.category,
      price: product.price,
      images: product.images || [],
      minOrder: product.minOrder || ''
    }))

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error('Failed to fetch related products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch related products' },
      { status: 500 }
    )
  }
}