import Link from 'next/link'
import { CalendarDays, Clock, MapPin, Ticket, Store, ArrowRight, Map } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { NextClassBanner } from '@/components/timetable/NextClassBanner'
import { sampleEvents, sampleShops, sampleTimetable, sampleProfiles } from '@/lib/data/sample'
import { THAPAR_ORGS, ORG_TYPE_COLORS, ORG_CATEGORY_COLORS } from '@/lib/data/societies'
import { formatEventDate } from '@/lib/utils/formatDate'

const user = sampleProfiles[0]

export default function HomePage() {
  // Find a plausible next class by picking the first slot.
  const nextSlot = sampleTimetable[0]

  return (
    <div className="space-y-8 p-4 pb-24 md:p-6 lg:p-8">
      {/* Greeting */}
      <section>
        <h2 className="text-2xl font-bold text-slate-950">
          Welcome back, {user.full_name.split(' ')[0]}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Here&apos;s what&apos;s happening on campus today.
        </p>
      </section>

      {/* Next class banner */}
      <section>
        <NextClassBanner slot={nextSlot} />
      </section>

      {/* Quick action cards */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { href: '/map', label: 'Campus Map', icon: Map, color: 'bg-brand-50 text-brand-600' },
          { href: '/events', label: 'Events', icon: Ticket, color: 'bg-purple-50 text-purple-600' },
          { href: '/timetable', label: 'Timetable', icon: CalendarDays, color: 'bg-amber-50 text-amber-600' },
          { href: '/shops', label: 'Shops', icon: Store, color: 'bg-emerald-50 text-emerald-600' },
        ].map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.href} href={action.href}>
              <Card className="group cursor-pointer transition hover:shadow-md">
                <CardContent className="flex flex-col items-center gap-3 py-6">
                  <span className={`grid size-11 place-items-center rounded-xl ${action.color}`}>
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-950">{action.label}</span>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </section>

      {/* Upcoming events */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-950">Upcoming Events</h3>
          <Link href="/events" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleEvents.map((event) => (
            <Card key={event.id} className="flex flex-col overflow-hidden transition hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge>{event.event_type.replace('_', ' ')}</Badge>
                  {event.ticket_price === 0 ? (
                    <Badge variant="success">Free</Badge>
                  ) : (
                    <Badge variant="warning">Rs {event.ticket_price}</Badge>
                  )}
                </div>
                <CardTitle className="text-base">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                <p className="line-clamp-2 text-sm text-slate-600">{event.description}</p>
                <div className="flex flex-col gap-1.5 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <CalendarDays className="size-3.5" /> {formatEventDate(event.start_time)}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="size-3.5" /> {event.building?.short_name ?? event.venue_note ?? 'Venue TBA'}
                  </span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-xs text-slate-400">
                    {event.current_registrations}/{event.max_capacity} spots
                  </span>
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex min-h-8 items-center justify-center gap-2 rounded-full bg-brand-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                  >
                    View
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Societies row */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-950">Student Organizations</h3>
          <Link href="/societies" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            View all 57 <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {THAPAR_ORGS.slice(0, 6).map((org) => (
            <Link key={org.id} href="/societies">
              <Card className="h-full transition hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                      {org.short_name.slice(0, 3)}
                    </span>
                    <div>
                      <CardTitle className="text-sm">{org.name}</CardTitle>
                      <div className="mt-1 flex gap-1.5">
                        <Badge className={ORG_TYPE_COLORS[org.type]} >{org.type}</Badge>
                        <Badge className={ORG_CATEGORY_COLORS[org.category]}>{org.category}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-slate-500">{org.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Campus shops */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-950">Campus Shops</h3>
          <Link href="/shops" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleShops.map((shop) => (
            <Card key={shop.id} className="transition hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-sm">{shop.name}</CardTitle>
                  <Badge variant={shop.is_open ? 'success' : 'secondary'}>{shop.is_open ? 'Open' : 'Closed'}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm text-slate-500">
                <p>{shop.description}</p>
                <span className="flex items-center gap-2">
                  <MapPin className="size-3.5" /> {shop.location_note}
                </span>
                {shop.opening_time && (
                  <span className="flex items-center gap-2">
                    <Clock className="size-3.5" /> {shop.opening_time} - {shop.closing_time}
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
