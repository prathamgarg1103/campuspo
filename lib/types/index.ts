export type UserRole = 'student' | 'society_admin' | 'faculty' | 'super_admin'

export interface Profile {
  id: string
  full_name: string
  roll_number?: string
  email: string
  branch?: string
  semester?: number
  year_of_joining?: number
  role: UserRole
  avatar_url?: string
  phone?: string
  hostel_block?: string
}

export interface Building {
  id: string
  name: string
  short_name?: string
  category: 'academic' | 'hostel' | 'food' | 'sports' | 'admin' | 'library' | 'medical' | 'shop' | 'other'
  latitude: number
  longitude: number
  floor_count?: number
  description?: string
  opening_time?: string
  closing_time?: string
  phone?: string
  is_24hrs: boolean
}

export interface Room {
  id: string
  building_id: string
  room_code: string
  floor?: number
  capacity?: number
  room_type: 'classroom' | 'lab' | 'seminar' | 'auditorium'
  building?: Building
}

export interface Shop {
  id: string
  building_id?: string
  name: string
  category: 'food' | 'stationery' | 'medical' | 'salon' | 'atm' | 'printing' | 'other'
  description?: string
  phone?: string
  opening_time?: string
  closing_time?: string
  is_24hrs: boolean
  is_open: boolean
  location_note?: string
  building?: Building
}

export interface Society {
  id: string
  name: string
  slug: string
  category?: string
  description?: string
  logo_url?: string
  email?: string
  instagram_url?: string
  is_active: boolean
}

export interface Event {
  id: string
  title: string
  description?: string
  event_type: 'thapar_official' | 'society' | 'workshop' | 'fest' | 'sports' | 'other'
  organiser_id: string
  society_id?: string
  building_id?: string
  room_id?: string
  venue_note?: string
  start_time: string
  end_time?: string
  registration_deadline?: string
  max_capacity?: number
  current_registrations: number
  ticket_price: number
  banner_url?: string
  tags?: string[]
  requires_registration: boolean
  is_published: boolean
  is_cancelled: boolean
  society?: Society
  building?: Building
  room?: Room
}

export interface Registration {
  id: string
  event_id: string
  user_id: string
  status: 'confirmed' | 'waitlisted' | 'cancelled'
  ticket_code: string
  checked_in: boolean
  checked_in_at?: string
  registered_at: string
  event?: Event
  profile?: Profile
}

export interface TimetableSlot {
  id: string
  branch: string
  semester: number
  section?: string
  subject_name: string
  subject_code?: string
  faculty_name?: string
  room_id?: string
  day_of_week: number
  start_time: string
  end_time: string
  room?: Room
}

export interface Notification {
  id: string
  user_id: string
  title: string
  body?: string
  type: 'event_reminder' | 'registration_confirm' | 'new_event' | 'general'
  related_event_id?: string
  is_read: boolean
  created_at: string
}
