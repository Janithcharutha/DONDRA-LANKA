import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET(
  request: Request,
  context: { params: { category: string } }
) {
  try {
    const category = context.params.category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    await connectDB()

    const products = await Product.find({ 
      category: {
        $regex: new RegExp(category, 'i')
      }
    })
    .sort({ createdAt: -1 })
    .limit(4) // Limit to 4 products per category
    .lean()

    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch category products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}