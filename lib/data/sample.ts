import type { Building, Event, Notification, Profile, Registration, Room, Shop, Society, TimetableSlot } from '@/lib/types'

export const sampleProfiles: Profile[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    full_name: 'Aarav Mehta',
    roll_number: '102303052',
    email: 'student@thapar.edu',
    branch: 'CSE',
    semester: 5,
    role: 'student',
    hostel_block: 'B',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    full_name: 'Nisha Kapoor',
    email: 'admin@thapar.edu',
    role: 'society_admin',
  },
]

export const sampleBuildings: Building[] = [
  { id: 'academic-a', name: 'Academic Block A', short_name: 'Block A', category: 'academic', latitude: 30.3525, longitude: 76.361, floor_count: 4, description: 'Lecture halls and labs for engineering departments.', is_24hrs: false },
  { id: 'library', name: 'Central Library', short_name: 'Library', category: 'library', latitude: 30.3522, longitude: 76.362, floor_count: 3, description: 'Reading halls, digital library, and issue desk.', is_24hrs: false },
  { id: 'canteen-main', name: 'Main Canteen', short_name: 'Canteen', category: 'food', latitude: 30.3518, longitude: 76.3615, description: 'Campus food court and quick bites.', phone: '+91 XXXXX XXXXX', is_24hrs: false },
  { id: 'sports-complex', name: 'Sports Complex', short_name: 'Sports', category: 'sports', latitude: 30.3517, longitude: 76.3599, description: 'Indoor courts, gym, and grounds access.', is_24hrs: false },
  { id: 'boys-hostel-b', name: 'Boys Hostel B', short_name: 'Hostel B', category: 'hostel', latitude: 30.3532, longitude: 76.3603, description: 'Student residence block.', is_24hrs: true },
]

const rawRooms: Room[] = [
  { id: 'room-e204', building_id: 'academic-a', room_code: 'E204', floor: 2, capacity: 80, room_type: 'classroom' },
  { id: 'room-lab-3', building_id: 'academic-a', room_code: 'Lab 3', floor: 1, capacity: 40, room_type: 'lab' },
  { id: 'room-lib-2', building_id: 'library', room_code: 'L-2', floor: 2, capacity: 120, room_type: 'seminar' },
]

export const sampleRooms: Room[] = rawRooms.map((room) => ({ ...room, building: sampleBuildings.find((building) => building.id === room.building_id) }))

export const sampleSocieties: Society[] = [
  { id: 'coding-club', name: 'Thapar Coding Club', slug: 'thapar-coding-club', category: 'technical', description: 'Competitive programming, hackathons, and developer meetups.', email: 'coding@thapar.edu', instagram_url: 'https://instagram.com', is_active: true },
  { id: 'zeitgeist', name: 'Zeitgeist Cultural Society', slug: 'zeitgeist', category: 'cultural', description: 'Music, theatre, dance, and campus culture nights.', email: 'zeitgeist@thapar.edu', instagram_url: 'https://instagram.com', is_active: true },
  { id: 'nss', name: 'NSS Thapar', slug: 'nss-thapar', category: 'social', description: 'Volunteer drives and social impact programs.', email: 'nss@thapar.edu', is_active: true },
]

const rawEvents: Event[] = [
  {
    id: 'event-orientation',
    title: 'Freshers Orientation Evening',
    description: 'An official welcome session with department introductions, campus resources, and a guided tour.',
    event_type: 'thapar_official',
    organiser_id: sampleProfiles[1].id,
    building_id: 'academic-a',
    room_id: 'room-e204',
    venue_note: 'E Block auditorium wing',
    start_time: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    end_time: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
    registration_deadline: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    max_capacity: 180,
    current_registrations: 96,
    ticket_price: 0,
    tags: ['orientation', 'official'],
    requires_registration: true,
    is_published: true,
    is_cancelled: false,
  },
  {
    id: 'event-hacknight',
    title: 'HackNight: Build for Campus',
    description: 'A six-hour build sprint for solving everyday student problems with software.',
    event_type: 'workshop',
    organiser_id: sampleProfiles[1].id,
    society_id: 'coding-club',
    building_id: 'library',
    room_id: 'room-lib-2',
    start_time: new Date(Date.now() + 1000 * 60 * 60 * 30).toISOString(),
    registration_deadline: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(),
    max_capacity: 80,
    current_registrations: 72,
    ticket_price: 0,
    tags: ['hackathon', 'coding', 'team'],
    requires_registration: true,
    is_published: true,
    is_cancelled: false,
  },
  {
    id: 'event-openmic',
    title: 'Courtyard Open Mic',
    description: 'A casual evening for poetry, stand-up, acoustic music, and spoken word.',
    event_type: 'society',
    organiser_id: sampleProfiles[1].id,
    society_id: 'zeitgeist',
    building_id: 'canteen-main',
    venue_note: 'Outdoor seating area',
    start_time: new Date(Date.now() + 1000 * 60 * 60 * 52).toISOString(),
    registration_deadline: new Date(Date.now() + 1000 * 60 * 60 * 44).toISOString(),
    max_capacity: 120,
    current_registrations: 33,
    ticket_price: 0,
    tags: ['culture', 'music'],
    requires_registration: true,
    is_published: true,
    is_cancelled: false,
  },
]

export const sampleEvents: Event[] = rawEvents.map((event) => ({
  ...event,
  society: sampleSocieties.find((society) => society.id === event.society_id),
  building: sampleBuildings.find((building) => building.id === event.building_id),
  room: sampleRooms.find((room) => room.id === event.room_id),
}))

export const sampleShops: Shop[] = [
  { id: 'shop-wraps', building_id: 'canteen-main', name: 'Wraps & More', category: 'food', description: 'Rolls, sandwiches, cold coffee, and meal combos.', phone: '+91 XXXXX XXXXX', opening_time: '08:00', closing_time: '22:00', is_24hrs: false, is_open: true, location_note: 'Counter 3, main canteen', building: sampleBuildings[2] },
  { id: 'shop-print', building_id: 'academic-a', name: 'Campus Print Desk', category: 'printing', description: 'Printouts, binding, project reports, and stationery.', phone: '+91 XXXXX XXXXX', opening_time: '09:00', closing_time: '18:00', is_24hrs: false, is_open: true, location_note: 'Ground floor near staircase', building: sampleBuildings[0] },
  { id: 'shop-atm', building_id: 'boys-hostel-b', name: 'Hostel ATM', category: 'atm', description: 'Cash withdrawal kiosk near hostel entrance.', opening_time: '00:00', closing_time: '23:59', is_24hrs: true, is_open: true, location_note: 'Gate lobby', building: sampleBuildings[4] },
]

export const sampleTimetable: TimetableSlot[] = [
  { id: 'tt-1', branch: 'CSE', semester: 5, section: 'A', subject_name: 'Operating Systems', subject_code: 'UCS303', faculty_name: 'Dr. K. Sharma', room_id: 'room-e204', day_of_week: 1, start_time: '09:00', end_time: '09:50' },
  { id: 'tt-2', branch: 'CSE', semester: 5, section: 'A', subject_name: 'Database Systems Lab', subject_code: 'UCS310', faculty_name: 'Prof. A. Bedi', room_id: 'room-lab-3', day_of_week: 1, start_time: '10:00', end_time: '11:50' },
  { id: 'tt-3', branch: 'CSE', semester: 5, section: 'A', subject_name: 'Computer Networks', subject_code: 'UCS304', faculty_name: 'Dr. R. Saini', room_id: 'room-lib-2', day_of_week: 2, start_time: '11:00', end_time: '11:50' },
  { id: 'tt-4', branch: 'CSE', semester: 5, section: 'A', subject_name: 'Software Engineering', subject_code: 'UCS305', faculty_name: 'Dr. N. Kaur', room_id: 'room-e204', day_of_week: 3, start_time: '12:00', end_time: '12:50' },
  { id: 'tt-5', branch: 'CSE', semester: 5, section: 'A', subject_name: 'AI Fundamentals', subject_code: 'UCS411', faculty_name: 'Dr. S. Singh', room_id: 'room-lib-2', day_of_week: 4, start_time: '14:00', end_time: '14:50' },
].map((slot) => ({ ...slot, room: sampleRooms.find((room) => room.id === slot.room_id) }))

export const sampleRegistrations: Registration[] = [
  {
    id: 'reg-1',
    event_id: 'event-orientation',
    user_id: sampleProfiles[0].id,
    status: 'confirmed',
    ticket_code: 'CGO-4F2A',
    checked_in: false,
    registered_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    event: sampleEvents[0],
    profile: sampleProfiles[0],
  },
]

export const sampleNotifications: Notification[] = [
  {
    id: 'notif-1',
    user_id: sampleProfiles[0].id,
    title: 'Orientation starts today',
    body: 'Your QR ticket is ready. Reach Academic Block A 10 minutes early.',
    type: 'event_reminder',
    related_event_id: 'event-orientation',
    is_read: false,
    created_at: new Date().toISOString(),
  },
]
