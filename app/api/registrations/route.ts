import { NextResponse } from 'next/server'
import { sampleEvents } from '@/lib/data/sample'

export async function POST(request: Request) {
  let eventId: string | undefined

  try {
    const body = await request.json()
    eventId = body.event_id
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const event = sampleEvents.find((item) => item.id === eventId)

  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }

  if (event.registration_deadline && new Date(event.registration_deadline) < new Date()) {
    return NextResponse.json({ error: 'Registration closed' }, { status: 400 })
  }

  if (event.max_capacity && event.current_registrations >= event.max_capacity) {
    return NextResponse.json({ error: 'Event is full' }, { status: 400 })
  }

  const ticketCode = `CGO-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

  return NextResponse.json({
    registration: {
      id: `demo-${ticketCode.toLowerCase()}`,
      event_id: event.id,
      status: 'confirmed',
      ticket_code: ticketCode,
    },
    ticket_code: ticketCode,
  })
}
