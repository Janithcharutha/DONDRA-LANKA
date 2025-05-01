import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: Request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const product = await Product.findById(id)
        .select('_id name description category price images status minOrder createdAt updatedAt isFeatured')
        .lean()
      
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      
      return NextResponse.json(product)
    }

    const products = await Product.find({})
      .select('_id name description category price images status minOrder createdAt updatedAt isFeatured')
      .lean()
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    
    const body = await req.json()
    console.log('Received product data:', body)

    // Enhanced validation for description
    if (!body.description?.trim()) {
      return NextResponse.json({
        message: 'Description is required and cannot be empty'
      }, { status: 400 })
    }

    // Create product data with explicit fields
    const productData = {
      name: body.name.trim(),
      category: body.category,
      price: Number(body.price),
      description: body.description.trim(), // Make sure this is included
      minOrder: body.minOrder,
      images: body.images,
      status: body.status || 'In Stock',
      isFeatured: false
    }

    // Save to database
    const product = await Product.create(productData)

    // Fetch the saved product to ensure all fields are included
    const savedProduct = await Product.findById(product._id)
      .select('_id name description category price images status minOrder createdAt updatedAt isFeatured')
      .lean()

    return NextResponse.json(savedProduct, { status: 201 })

  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json({
      message: 'Failed to create product',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}