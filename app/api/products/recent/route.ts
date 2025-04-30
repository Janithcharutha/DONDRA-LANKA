import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectDB()
    
    const recentProducts = await Product.find()
      .select('name category price status minOrder images') // Added minOrder
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    return NextResponse.json(recentProducts)
  } catch (error) {
    console.error('Error fetching recent products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recent products' },
      { status: 500 }
    )
  }
}