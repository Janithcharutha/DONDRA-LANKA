import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectDB()

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch recent products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recent products' },
      { status: 500 }
    )
  }
}