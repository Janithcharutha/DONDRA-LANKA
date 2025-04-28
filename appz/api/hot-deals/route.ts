import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import HotDeal from '@/models/HotDeal'
import Product from '@/models/Product'
import type { LeanHotDealDoc } from '@/types/mongodb'
import { isValidObjectId } from 'mongoose'

export async function GET() {
  try {
    await connectDB()
    console.log('Fetching hot deals from database...')

    const hotDeals = (await HotDeal.find()
      .populate({
        path: 'product',
        select: '_id name images price category',
        model: Product
      })
      .sort({ createdAt: -1 })
      .lean()) as LeanHotDealDoc[]

    console.log('Found hot deals:', hotDeals.length)

    const formattedDeals = hotDeals.map(deal => ({
      _id: deal._id.toString(),
      name: deal.name,
      description: deal.description,
      product: {
        _id: deal.product._id.toString(),
        name: deal.product.name,
        images: deal.product.images,
        price: deal.product.price,
        category: deal.product.category
      },
      originalPrice: deal.originalPrice,
      discountedPrice: deal.discountedPrice,
      discount: deal.discount,
      startDate: deal.startDate.toISOString(),
      endDate: deal.endDate.toISOString(),
      status: deal.status,
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

    // Validate required fields
    const requiredFields = [
      'name', 
      'description', 
      'product', 
      'originalPrice',
      'discountedPrice',
      'discount',
      'startDate',
      'endDate'
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate product ID
    if (!isValidObjectId(body.product)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    // Create new hot deal
    const hotDeal = await HotDeal.create({
      ...body,
      status: 'Active', // Default status
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate)
    })

    // Populate product details
    await hotDeal.populate('product')

    return NextResponse.json(hotDeal, { status: 201 })
  } catch (error) {
    console.error('Failed to create hot deal:', error)
    return NextResponse.json(
      { error: 'Failed to create hot deal' },
      { status: 500 }
    )
  }
}

function getTimeLeft(endDate: Date): string {
  const now = new Date()
  const diff = endDate.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

  if (days < 0) return 'Expired'
  if (days === 0) return 'Ends today'
  if (days === 1) return '1 day'
  return `${days} days`
}