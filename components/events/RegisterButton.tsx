'use client'

import { useMemo, useState } from 'react'
import type { Event } from '@/lib/types'
import { Button } from '@/components/ui/button'

export function RegisterButton({ event }: { event: Event }) {
  const [registered, setRegistered] = useState(false)
  const [ticketCode, setTicketCode] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const disabledReason = useMemo(() => {
    if (event.registration_deadline && new Date(event.registration_deadline) < new Date()) return 'Registration closed'
    if (event.max_capacity && event.current_registrations >= event.max_capacity) return 'Event is full'
    if (!event.requires_registration) return 'No registration needed'
    return null
  }, [event])

  async function register() {
    setPending(true)
    setError(null)
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id: event.id }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error ?? 'Registration failed')
      setRegistered(true)
      setTicketCode(payload.ticket_code)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your_') || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        setRegistered(true)
        setTicketCode(`CGO-${Math.random().toString(36).slice(2, 6).toUpperCase()}`)
      }
    } finally {
      setPending(false)
    }
  }

  if (registered) {
    return (
      <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
        <p className="text-sm font-semibold text-emerald-800">Registered</p>
        <p className="mt-1 text-sm text-emerald-700">Ticket code: {ticketCode}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={register} disabled={pending || Boolean(disabledReason)} className="w-full sm:w-auto">
        {pending ? 'Registering...' : disabledReason ?? 'Register'}
      </Button>
      {error ? <p className="text-sm text-amber-700">{error}. Showing demo ticket until Supabase is configured.</p> : null}
    </div>
  )
}
