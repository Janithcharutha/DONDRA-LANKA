import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import PriceList from '@/models/PriceList'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const priceLists = await PriceList.find().sort({ createdAt: -1 })
    console.log('Fetched price lists:', priceLists.length)
    return NextResponse.json(priceLists)
  } catch (error) {
    console.error('Error fetching price lists:', error)
    return NextResponse.json(
      { error: 'Failed to fetch price lists' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    await connectDB()

    // If new price list is active, deactivate others
    if (body.status === 'Active') {
      await PriceList.updateMany(
        { status: 'Active' },
        { status: 'Inactive' }
      )
    }

    const priceList = await PriceList.create(body)
    return NextResponse.json(priceList)
  } catch (error) {
    console.error('Error creating price list:', error)
    return NextResponse.json(
      { error: 'Failed to create price list' },
      { status: 500 }
    )
  }
}