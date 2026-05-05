'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function NotificationComposer() {
  const [sent, setSent] = useState(false)

  return (
    <form className="grid gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm" onSubmit={(event) => {
      event.preventDefault()
      setSent(true)
    }}>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">Title<Input required placeholder="Event reminder" /></label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">Body<Textarea required placeholder="Write a clear update for students." /></label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
        Target group
        <Select>
          <option value="all">All students</option>
          <option value="branch:CSE">Branch: CSE</option>
          <option value="semester:5">Semester: 5</option>
          <option value="hostel:B">Hostel B</option>
        </Select>
      </label>
      <div className="flex items-center gap-3">
        <Button type="submit">Send broadcast</Button>
        {sent ? <span className="text-sm text-emerald-700">Notification queued locally. FCM push: TODO phase 2.</span> : null}
      </div>
    </form>
  )
}
