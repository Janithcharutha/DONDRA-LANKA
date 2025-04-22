import { NextResponse } from 'next/server'
import { isValidObjectId } from 'mongoose'
import connectDB from '@/lib/mongodb'
import NewsBanner from '@/models/NewsBanner'
import type { LeanNewsBannerDoc } from '@/types/mongodb'

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid banner ID' },
        { status: 400 }
      )
    }

    await connectDB()

    const banner = await NewsBanner.findById(id).lean() as LeanNewsBannerDoc

    if (!banner) {
      return NextResponse.json(
        { error: 'Banner not found' },
        { status: 404 }
      )
    }

    // Format the banner data
    const formattedBanner = {
      _id: banner._id.toString(),
      title: banner.title,
      content: banner.content,
      imageUrl: banner.imageUrl,
      startDate: banner.startDate.toISOString(),
      endDate: banner.endDate.toISOString(),
      status: banner.status,
      createdAt: banner.createdAt.toISOString(),
      updatedAt: banner.updatedAt.toISOString()
    }

    return NextResponse.json(formattedBanner)
  } catch (error) {
    console.error('Failed to fetch banner:', error)
    return NextResponse.json(
      { error: 'Failed to fetch banner' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid banner ID' },
        { status: 400 }
      )
    }

    await connectDB()

    const deletedBanner = await NewsBanner.findByIdAndDelete(id)

    if (!deletedBanner) {
      return NextResponse.json(
        { error: 'Banner not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Banner deleted successfully' })
  } catch (error) {
    console.error('Failed to delete banner:', error)
    return NextResponse.json(
      { error: 'Failed to delete banner' },
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
    const body = await request.json()

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid banner ID' },
        { status: 400 }
      )
    }

    await connectDB()

    const updatedBanner = await NewsBanner.findByIdAndUpdate(
      id,
      {
        imageUrl: body.imageUrl,
        startDate: body.startDate,
        endDate: body.endDate,
        status: body.status
      },
      { new: true, runValidators: true }
    )

    if (!updatedBanner) {
      return NextResponse.json(
        { error: 'Banner not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedBanner)
  } catch (error) {
    console.error('Failed to update banner:', error)
    return NextResponse.json(
      { error: 'Failed to update banner' },
      { status: 500 }
    )
  }
}