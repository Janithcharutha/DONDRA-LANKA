import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import type { LeanProductDoc } from '@/types/mongodb'

export async function GET(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params
    
    const formattedCategory = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    await connectDB()

    const products = (await Product.find({ category: formattedCategory })
      .sort({ createdAt: -1 })
      .lean()) as LeanProductDoc[]

    const formattedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    }))

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error('Failed to fetch products by category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}