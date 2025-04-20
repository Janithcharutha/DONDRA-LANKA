import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectDB()

    const products = await Product.find({ 
      status: 'In Stock' 
    })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean()

    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch featured products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    )
  }
}