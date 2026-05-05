'use client'

import { useQuery } from '@tanstack/react-query'
import { sampleRegistrations } from '@/lib/data/sample'

export function useRegistrations() {
  return useQuery({
    queryKey: ['registrations'],
    queryFn: async () => sampleRegistrations,
    initialData: sampleRegistrations,
  })
}
