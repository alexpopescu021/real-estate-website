import { NextResponse } from 'next/server'
import { verifyCredentials, createSession } from '@/lib/auth'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const isValid = await verifyCredentials(username, password)

  if (isValid) {
    await createSession()
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
