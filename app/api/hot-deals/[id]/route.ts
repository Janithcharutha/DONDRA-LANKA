import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import HotDeal from '@/models/HotDeal'
import { isValidObjectId, Types } from 'mongoose'
import type { HotDeal as HotDealType } from '@/types/hot-deal'

interface LeanHotDeal {
  _id: Types.ObjectId;
  name: string;
  description: string;
  product: any;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

// Add helper function at the top level
function calculateTimeLeft(endDate: Date): string {
  const now = new Date()
  const diff = endDate.getTime() - now.getTime()
  
  if (diff <= 0) return 'Expired'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  return `${days}d ${hours}h`
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params promise
    const { id } = await context.params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid hot deal ID' },
        { status: 400 }
      )
    }

    await connectDB()

    const hotDeal = await HotDeal.findById(id)
      .populate('product')
      .lean() as LeanHotDeal

    if (!hotDeal) {
      return NextResponse.json(
        { error: 'Hot deal not found' },
        { status: 404 }
      )
    }

    // Format the hot deal data
    const formattedDeal: HotDealType = {
      _id: hotDeal._id.toString(),
      name: hotDeal.name,
      description: hotDeal.description,
      product: hotDeal.product,
      originalPrice: hotDeal.originalPrice,
      discountedPrice: hotDeal.discountedPrice,
      discount: hotDeal.discount,
      startDate: hotDeal.startDate.toISOString(),
      endDate: hotDeal.endDate.toISOString(),
      status: hotDeal.status as HotDealType['status'],
      timeLeft: calculateTimeLeft(hotDeal.endDate), // Add this line
      createdAt: hotDeal.createdAt.toISOString(),
      updatedAt: hotDeal.updatedAt.toISOString()
    }

    return NextResponse.json(formattedDeal)
  } catch (error) {
    console.error('Failed to fetch hot deal:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hot deal' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid hot deal ID' },
        { status: 400 }
      )
    }

    await connectDB()

    const deletedDeal = await HotDeal.findByIdAndDelete(id)

    if (!deletedDeal) {
      return NextResponse.json(
        { error: 'Hot deal not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Hot deal deleted successfully' })
  } catch (error) {
    console.error('Failed to delete hot deal:', error)
    return NextResponse.json(
      { error: 'Failed to delete hot deal' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid hot deal ID' },
        { status: 400 }
      )
    }

    await connectDB()
    
    const body = await request.json()
    const updatedHotDeal = await HotDeal.findByIdAndUpdate(
      id,
      {
        ...body,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate)
      },
      { new: true }
    ).populate('product')

    if (!updatedHotDeal) {
      return NextResponse.json(
        { error: 'Hot deal not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedHotDeal)
  } catch (error) {
    console.error('Failed to update hot deal:', error)
    return NextResponse.json(
      { error: 'Failed to update hot deal' },
      { status: 500 }
    )
  }
}