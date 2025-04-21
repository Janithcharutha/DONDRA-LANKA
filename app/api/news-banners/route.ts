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
      title: banner.title,
      content: banner.content,
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

    const newsBanner = await NewsBanner.create(body)
    return NextResponse.json(newsBanner, { status: 201 })
  } catch (error) {
    console.error('Failed to create news banner:', error)
    return NextResponse.json(
      { error: 'Failed to create news banner' },
      { status: 500 }
    )
  }
}