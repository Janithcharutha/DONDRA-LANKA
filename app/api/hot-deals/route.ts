import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import HotDeal from '@/models/HotDeal'
import { isValidObjectId } from 'mongoose'
import type { HotDeal as IHotDeal, HotDealDocument } from '@/types/hot-deal'

function calculateTimeLeft(endDate: Date): string {
  const now = new Date()
  const diff = endDate.getTime() - now.getTime()
  
  if (diff <= 0) return 'Expired'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  return `${days}d ${hours}h`
}

export async function GET() {
  try {
    await connectDB()
    
    const hotDeals = await HotDeal.find()
      .populate('product')
      .sort({ createdAt: -1 })
      .lean() as unknown as HotDealDocument[]

    if (!hotDeals) {
      return NextResponse.json([])
    }

    const formattedDeals: IHotDeal[] = hotDeals
      .filter(deal => deal?.product)
      .map(deal => ({
        _id: deal._id.toString(),
        name: deal.name,
        description: deal.description,
        product: {
          _id: deal.product._id.toString(),
          name: deal.product.name,
          images: deal.product.images || [],
          price: deal.product.price,
          status: deal.product.status
        },
        originalPrice: deal.originalPrice,
        discountedPrice: deal.discountedPrice,
        discount: deal.discount,
        startDate: deal.startDate.toISOString(),
        endDate: deal.endDate.toISOString(),
        status: deal.status,
        timeLeft: calculateTimeLeft(deal.endDate),
        createdAt: deal.createdAt.toISOString(),
        updatedAt: deal.updatedAt.toISOString()
      }))

    return NextResponse.json(formattedDeals)
  } catch (error) {
    console.error('Failed to fetch hot deals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hot deals' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const { 
      name, 
      description, 
      product, 
      originalPrice,
      discountedPrice,
      discount,
      startDate,
      endDate,
      status 
    } = body

    // Validate required fields
    if (!name || !product || !originalPrice || !discountedPrice || !discount || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate product ID
    if (!isValidObjectId(product)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const hotDeal = await HotDeal.create({
      name,
      description,
      product,
      originalPrice,
      discountedPrice,
      discount,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: status || 'Active'
    })

    await hotDeal.populate('product')

    const formattedDeal: IHotDeal = {
      _id: hotDeal._id.toString(),
      name: hotDeal.name,
      description: hotDeal.description,
      product: hotDeal.product,
      originalPrice: hotDeal.originalPrice,
      discountedPrice: hotDeal.discountedPrice,
      discount: hotDeal.discount,
      startDate: hotDeal.startDate.toISOString(),
      endDate: hotDeal.endDate.toISOString(),
      status: hotDeal.status as IHotDeal['status'],
      timeLeft: calculateTimeLeft(hotDeal.endDate),
      createdAt: hotDeal.createdAt.toISOString(),
      updatedAt: hotDeal.updatedAt.toISOString()
    }

    return NextResponse.json(formattedDeal)
  } catch (error) {
    console.error('Failed to create hot deal:', error)
    return NextResponse.json(
      { error: 'Failed to create hot deal' },
      { status: 500 }
    )
  }
}