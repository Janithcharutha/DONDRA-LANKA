import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import PriceList from '@/models/PriceList'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    console.log('Attempting to delete price list:', params.id)
    
    const deletedPriceList = await PriceList.findByIdAndDelete(params.id)
    
    if (!deletedPriceList) {
      console.log('Price list not found')
      return NextResponse.json(
        { error: 'Price list not found' },
        { status: 404 }
      )
    }

    console.log('Price list deleted successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting price list:', error)
    return NextResponse.json(
      { error: 'Failed to delete price list' },
      { status: 500 }
    )
  }
}