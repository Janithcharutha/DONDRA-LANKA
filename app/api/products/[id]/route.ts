import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import { isValidObjectId } from 'mongoose'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const product = await Product.findById(params.id)
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
      })
    }
    return new Response(JSON.stringify(product), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    })
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    await connectDB()

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to delete product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const body = await req.json()

    // Validate description
    if (!body.description?.trim()) {
      return NextResponse.json({
        message: 'Description is required'
      }, { status: 400 })
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      {
        ...body,
        description: body.description.trim()
      },
      { new: true, runValidators: true }
    ).lean()

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Failed to update product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}