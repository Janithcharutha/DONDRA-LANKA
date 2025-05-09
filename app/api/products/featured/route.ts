import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    await connectDB()
    
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(6)  // Changed from 3 to 6
      .lean()

    console.log(`Found ${products.length} products`)
    return NextResponse.json(products)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' }, 
      { status: 500 }
    )
  }
}