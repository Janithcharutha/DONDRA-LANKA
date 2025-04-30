import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  try {
    const { path } = await request.json()
    
    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, now: Date.now() })
    }

    return NextResponse.json(
      { error: 'Path parameter is required' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    )
  }
}