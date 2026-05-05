'use client'

import { useMemo, useState } from 'react'
import type { Registration } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export function RegistrationTable({ registrations }: { registrations: Registration[] }) {
  const [query, setQuery] = useState('')
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const filtered = useMemo(() => registrations.filter((registration) => `${registration.profile?.full_name} ${registration.profile?.roll_number}`.toLowerCase().includes(query.toLowerCase())), [query, registrations])

  function exportCsv() {
    const rows = filtered.map((registration) => [
      registration.profile?.roll_number,
      registration.profile?.full_name,
      registration.profile?.branch,
      registration.profile?.semester,
      registration.ticket_code,
      registration.registered_at,
      checked[registration.id] || registration.checked_in ? 'checked_in' : 'pending',
    ])
    const csv = [['Roll No', 'Name', 'Branch', 'Semester', 'Ticket Code', 'Registered At', 'Check-in Status'], ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'registrations.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row md:items-center md:justify-between">
        <Input className="md:max-w-sm" placeholder="Search by name or roll number" value={query} onChange={(event) => setQuery(event.target.value)} />
        <Button onClick={exportCsv} variant="outline">Export CSV</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Roll No</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Branch</th>
              <th className="px-4 py-3">Ticket Code</th>
              <th className="px-4 py-3">Registered At</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((registration) => {
              const isChecked = checked[registration.id] || registration.checked_in
              return (
                <tr key={registration.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{registration.profile?.roll_number}</td>
                  <td className="px-4 py-3 font-medium text-slate-950">{registration.profile?.full_name}</td>
                  <td className="px-4 py-3">{registration.profile?.branch} Sem {registration.profile?.semester}</td>
                  <td className="px-4 py-3">{registration.ticket_code}</td>
                  <td className="px-4 py-3">{new Date(registration.registered_at).toLocaleString()}</td>
                  <td className="px-4 py-3"><Badge variant={isChecked ? 'success' : 'warning'}>{isChecked ? 'Checked in' : 'Pending'}</Badge></td>
                  <td className="px-4 py-3"><Button variant="secondary" onClick={() => setChecked((state) => ({ ...state, [registration.id]: true }))}>Mark as Checked In</Button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
