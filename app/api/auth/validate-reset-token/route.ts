import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    // Verify token
    verify(token, process.env.JWT_SECRET || 'fallback-secret')

    return NextResponse.json({ valid: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}