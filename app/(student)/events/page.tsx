'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Calendar, MapPin, Users, Ticket, ArrowUpRight } from 'lucide-react'
import { sampleEvents } from '@/lib/data/sample'
import { format } from 'date-fns'

export default function EventsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('all')

  const events = useMemo(() => {
    return sampleEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
        (event.description && event.description.toLowerCase().includes(search.toLowerCase())) ||
        (event.society && event.society.name.toLowerCase().includes(search.toLowerCase()))
      
      const matchesFilter = filter === 'all' || event.event_type === filter

      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  const eventTypeColors: Record<string, string> = {
    thapar_official: 'bg-brand-100 text-brand-700 border-brand-200',
    society: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    workshop: 'bg-blue-100 text-blue-700 border-blue-200',
    fest: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
    sports: 'bg-orange-100 text-orange-700 border-orange-200',
    other: 'bg-slate-100 text-slate-700 border-slate-200',
  }

  const eventTypeLabels: Record<string, string> = {
    thapar_official: 'Official',
    society: 'Society Event',
    workshop: 'Workshop',
    fest: 'Fest',
    sports: 'Sports',
    other: 'Other',
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Campus Events</h1>
        <p className="text-slate-500 mt-1">Discover what's happening around campus</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input 
            placeholder="Search events, societies, or descriptions..." 
            className="pl-9 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white min-w-[200px]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Events</option>
          {Object.entries(eventTypeLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {events.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-slate-500">
            No events found matching your criteria.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const startDate = new Date(event.start_time)
            
            return (
              <Card key={event.id} className="flex flex-col group overflow-hidden hover:shadow-md transition">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg leading-tight group-hover:text-brand-600 transition-colors">
                      {event.title}
                    </CardTitle>
                    <Badge variant="outline" className={`whitespace-nowrap ${eventTypeColors[event.event_type] || eventTypeColors.other}`}>
                      {eventTypeLabels[event.event_type] || 'Event'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 gap-4">
                  {event.society && (
                    <p className="text-xs font-medium text-brand-600">By {event.society.name}</p>
                  )}
                  <p className="text-sm text-slate-500 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="space-y-2 mt-auto text-sm text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-slate-400" />
                      <span>{format(startDate, 'MMM d, h:mm a')}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-slate-400" />
                      <span className="truncate">
                        {event.building?.name || event.venue_note || 'TBA'}
                        {event.room ? ` (${event.room.room_code})` : ''}
                      </span>
                    </div>

                    {event.max_capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="size-4 text-slate-400" />
                        <span>{event.current_registrations} / {event.max_capacity} Registered</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Ticket className="size-4 text-slate-400" />
                      <span className="font-medium text-slate-900">{event.ticket_price === 0 ? 'Free' : `₹${event.ticket_price}`}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant={event.requires_registration ? 'default' : 'outline'}>
                    {event.requires_registration ? 'Register Now' : 'View Details'} 
                    <ArrowUpRight className="size-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
