import Link from 'next/link'
import { CalendarDays, MapPin } from 'lucide-react'
import type { Event } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatEventDate } from '@/lib/utils/formatDate'

export function EventCard({ event }: { event: Event }) {
  const capacity = event.max_capacity ? `${event.current_registrations}/${event.max_capacity}` : `${event.current_registrations} registered`

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge>{event.event_type.replace('_', ' ')}</Badge>
          {event.ticket_price === 0 ? <Badge variant="success">Free</Badge> : <Badge variant="warning">Rs {event.ticket_price}</Badge>}
        </div>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="line-clamp-3 text-sm text-slate-600">{event.description}</p>
        <div className="flex flex-col gap-2 text-sm text-slate-500">
          <span className="flex items-center gap-2"><CalendarDays className="size-4" /> {formatEventDate(event.start_time)}</span>
          <span className="flex items-center gap-2"><MapPin className="size-4" /> {event.building?.short_name ?? event.venue_note ?? 'Venue TBA'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {event.tags?.map((tag) => <Badge key={tag} variant="outline">#{tag}</Badge>)}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-sm text-slate-500">{capacity}</span>
        <Link
          href={`/events/${event.id}`}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          View
        </Link>
      </CardFooter>
    </Card>
  )
}
