import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ArrowLeft, CalendarDays, Clock, MapPin, Tag, Ticket, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RegisterButton } from '@/components/events/RegisterButton'
import { sampleEvents } from '@/lib/data/sample'

const eventTypeLabels: Record<string, string> = {
  thapar_official: 'Official',
  society: 'Society Event',
  workshop: 'Workshop',
  fest: 'Fest',
  sports: 'Sports',
  other: 'Other',
}

export function generateStaticParams() {
  return sampleEvents.map((event) => ({ id: event.id }))
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = sampleEvents.find((item) => item.id === params.id)

  if (!event) {
    notFound()
  }

  const start = new Date(event.start_time)
  const end = event.end_time ? new Date(event.end_time) : null
  const deadline = event.registration_deadline ? new Date(event.registration_deadline) : null
  const venue = event.building?.name ?? event.venue_note ?? 'Venue TBA'
  const room = event.room?.room_code ? `, ${event.room.room_code}` : ''
  const capacity = event.max_capacity ? `${event.current_registrations}/${event.max_capacity}` : `${event.current_registrations} registered`

  return (
    <div className="space-y-6 p-4 pb-24 md:p-6 lg:p-8">
      <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-brand-600">
        <ArrowLeft className="size-4" />
        Back to events
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge>{eventTypeLabels[event.event_type] ?? 'Event'}</Badge>
                {event.ticket_price === 0 ? <Badge variant="success">Free</Badge> : <Badge variant="warning">Rs {event.ticket_price}</Badge>}
                {event.society ? <Badge variant="outline">{event.society.name}</Badge> : null}
              </div>
              <div>
                <h1 className="text-2xl font-bold leading-tight text-slate-950 md:text-3xl">{event.title}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{event.description}</p>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
              <div className="flex gap-3">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-brand-600" />
                <span>
                  <span className="block font-medium text-slate-950">Date</span>
                  {format(start, 'EEEE, MMMM d')}
                </span>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-600" />
                <span>
                  <span className="block font-medium text-slate-950">Time</span>
                  {format(start, 'h:mm a')}{end ? ` - ${format(end, 'h:mm a')}` : ''}
                </span>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" />
                <span>
                  <span className="block font-medium text-slate-950">Venue</span>
                  {venue}{room}
                </span>
              </div>
              <div className="flex gap-3">
                <Users className="mt-0.5 size-4 shrink-0 text-brand-600" />
                <span>
                  <span className="block font-medium text-slate-950">Capacity</span>
                  {capacity}
                </span>
              </div>
              {deadline ? (
                <div className="flex gap-3">
                  <Ticket className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  <span>
                    <span className="block font-medium text-slate-950">Registration Deadline</span>
                    {format(deadline, 'MMM d, h:mm a')}
                  </span>
                </div>
              ) : null}
              {event.tags?.length ? (
                <div className="flex gap-3">
                  <Tag className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  <span>
                    <span className="block font-medium text-slate-950">Tags</span>
                    <span className="mt-1 flex flex-wrap gap-1.5">
                      {event.tags.map((tag) => <Badge key={tag} variant="outline">#{tag}</Badge>)}
                    </span>
                  </span>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <aside>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-500">
                Register with your Thapar account. Your ticket code appears here after confirmation.
              </p>
              <RegisterButton event={event} />
              <Link
                href="/map"
                className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                Open Campus Map
              </Link>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}
