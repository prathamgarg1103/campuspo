'use client'

import { useMemo, useState } from 'react'
import type { Event } from '@/lib/types'
import { EventCard } from '@/components/events/EventCard'
import { cn } from '@/lib/utils/cn'

const filters = ['all', 'thapar_official', 'society', 'workshop', 'sports'] as const

export function EventFeed({ events }: { events: Event[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('all')
  const filtered = useMemo(() => filter === 'all' ? events : events.filter((event) => event.event_type === filter), [events, filter])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={cn('rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium capitalize text-slate-600', filter === item && 'border-brand-600 bg-brand-600 text-white')}>
            {item.replace('_', ' ')}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {filtered.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  )
}
