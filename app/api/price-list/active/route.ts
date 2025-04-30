import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import PriceList from '@/models/PriceList'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    console.log('Connecting to database...')
    await connectDB()
    
    console.log('Fetching active price list...')
    const activeList = await PriceList.findOne({ 
      status: 'Active' 
    }).sort({ 
      createdAt: -1 
    }).lean()

    console.log('Found price list:', activeList) // Debug log

    if (!activeList) {
      console.log('No active price list found')
      // Try to get any price list if no active one exists
      const anyList = await PriceList.findOne().sort({ 
        createdAt: -1 
      }).lean()

      if (anyList) {
        console.log('Found fallback price list:', anyList)
        return NextResponse.json(anyList)
      }

      return NextResponse.json(null)
    }

    return NextResponse.json(activeList)
  } catch (error) {
    console.error('Error fetching active price list:', error)
    return NextResponse.json(
      { error: 'Failed to fetch price list' },
      { status: 500 }
    )
  }
}