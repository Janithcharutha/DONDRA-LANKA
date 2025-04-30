import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import PriceList from '@/models/PriceList'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    if (!data.imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    await connectDB()

    // Deactivate all existing price lists
    await PriceList.updateMany(
      { status: 'Active' },
      { status: 'Inactive' }
    )

    // Create new price list
    const priceList = await PriceList.create({
      imageUrl: data.imageUrl,
      status: 'Active'
    })

    return NextResponse.json(priceList)
  } catch (error) {
    console.error('Price list upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload price list' },
      { status: 500 }
    )
  }
}