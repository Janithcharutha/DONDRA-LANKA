import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    await connectDB()

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    )

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Revalidate all affected pages
    revalidatePath('/admin/products')
    revalidatePath('/admin')
    revalidatePath(`/products/${params.id}`)

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    )
  }
}