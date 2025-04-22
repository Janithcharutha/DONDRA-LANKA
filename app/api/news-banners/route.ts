import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NewsBanner from '@/models/NewsBanner'
import type { LeanNewsBannerDoc } from '@/types/mongodb'

export async function GET() {
  try {
    await connectDB()
    
    const newsBanners = await NewsBanner.find()
      .sort({ createdAt: -1 })
      .lean() as LeanNewsBannerDoc[]

    const formattedBanners = newsBanners.map(banner => ({
      _id: banner._id.toString(),
      imageUrl: banner.imageUrl,
      startDate: banner.startDate.toISOString(),
      endDate: banner.endDate.toISOString(),
      status: banner.status,
      createdAt: banner.createdAt.toISOString(),
      updatedAt: banner.updatedAt.toISOString()
    }))

    return NextResponse.json(formattedBanners)
  } catch (error) {
    console.error('Failed to fetch news banners:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news banners' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()

    // Validate required fields
    if (!body.imageUrl || !body.startDate || !body.endDate) {
      return NextResponse.json(
        { error: 'Image URL, start date, and end date are required' },
        { status: 400 }
      )
    }

    const newsBanner = await NewsBanner.create({
      imageUrl: body.imageUrl,
      startDate: body.startDate,
      endDate: body.endDate,
      status: body.status || 'Active'
    })

    return NextResponse.json(newsBanner, { status: 201 })
  } catch (error) {
    console.error('Failed to create news banner:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create news banner' },
      { status: 500 }
    )
  }
}