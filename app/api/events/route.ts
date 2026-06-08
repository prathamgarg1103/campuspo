import { NextResponse } from 'next/server'
import { sampleEvents } from '@/lib/data/sample'

export async function GET() {
  return NextResponse.json({ events: sampleEvents })
}
