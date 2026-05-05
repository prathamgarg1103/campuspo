'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { sampleBuildings, sampleRooms, sampleSocieties } from '@/lib/data/sample'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const schema = z.object({
  title: z.string().min(3),
  event_type: z.enum(['thapar_official', 'society', 'workshop', 'fest', 'sports', 'other']),
  society_id: z.string().optional(),
  description: z.string().optional(),
  building_id: z.string().optional(),
  room_id: z.string().optional(),
  venue_note: z.string().optional(),
  start_time: z.string().min(1),
  end_time: z.string().optional(),
  registration_deadline: z.string().optional(),
  max_capacity: z.coerce.number().optional(),
  ticket_price: z.coerce.number().min(0),
  tags: z.string().optional(),
})

type FormValues = z.output<typeof schema>
type FormInput = z.input<typeof schema>

export function EventForm() {
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<string>()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { event_type: 'society', ticket_price: 0 },
  })
  const buildingId = watch('building_id')
  const rooms = sampleRooms.filter((room) => room.building_id === buildingId)

  function submit(values: FormValues, publish: boolean) {
    setStatus(`${publish ? 'Published' : 'Saved draft'} locally: ${values.title}`)
  }

  return (
    <form className="grid gap-5 rounded-xl border border-slate-100 bg-white p-5 shadow-sm" onSubmit={handleSubmit((values) => submit({ ...values, description }, true))}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Title
          <Input {...register('title')} placeholder="HackNight: Build for Campus" />
          {errors.title ? <span className="text-xs text-rose-600">Title is required.</span> : null}
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Event type
          <Select {...register('event_type')}>
            <option value="thapar_official">Thapar official</option>
            <option value="society">Society</option>
            <option value="workshop">Workshop</option>
            <option value="fest">Fest</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </Select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Society
          <Select {...register('society_id')}>
            <option value="">None</option>
            {sampleSocieties.map((society) => <option key={society.id} value={society.id}>{society.name}</option>)}
          </Select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Banner image
          <Input type="file" accept="image/*" />
          <span className="text-xs text-slate-500">TODO: upload to Supabase Storage, max 2MB.</span>
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
        Description
        <div data-color-mode="light">
          <MDEditor value={description} onChange={(value) => setDescription(value ?? '')} height={220} />
        </div>
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Building
          <Select {...register('building_id')}>
            <option value="">Venue TBA</option>
            {sampleBuildings.map((building) => <option key={building.id} value={building.id}>{building.name}</option>)}
          </Select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Room
          <Select {...register('room_id')}>
            <option value="">No room selected</option>
            {rooms.map((room) => <option key={room.id} value={room.id}>{room.room_code}</option>)}
          </Select>
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
        Venue note
        <Textarea {...register('venue_note')} placeholder="Outdoor seating area, main canteen" />
      </label>
      <div className="grid gap-4 md:grid-cols-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">Start datetime<Input type="datetime-local" {...register('start_time')} /></label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">End datetime<Input type="datetime-local" {...register('end_time')} /></label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">Registration deadline<Input type="datetime-local" {...register('registration_deadline')} /></label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">Max capacity<Input type="number" {...register('max_capacity')} placeholder="Unlimited" /></label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">Ticket price<Input type="number" step="0.01" {...register('ticket_price')} /></label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">Tags<Input {...register('tags')} placeholder="hackathon,coding,prize" /></label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" onClick={handleSubmit((values) => submit({ ...values, description }, false))}>Save as Draft</Button>
        <Button type="submit">Publish</Button>
        {status ? <span className="text-sm text-emerald-700">{status}</span> : null}
      </div>
    </form>
  )
}
