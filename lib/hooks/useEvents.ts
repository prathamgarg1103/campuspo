'use client'

import { useQuery } from '@tanstack/react-query'
import { sampleEvents } from '@/lib/data/sample'

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('/api/events')
      if (!response.ok) return sampleEvents
      return response.json()
    },
    initialData: sampleEvents,
  })
}
