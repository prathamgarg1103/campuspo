-- TODO: FILL IN REAL DATA after collecting official campus coordinates and timetable CSVs.

insert into public.buildings (id, name, short_name, category, latitude, longitude, floor_count, description, opening_time, closing_time, is_24hrs)
values
  ('11111111-0000-0000-0000-000000000001', 'Academic Block A', 'Block A', 'academic', 30.3525000, 76.3610000, 4, 'Lecture halls and labs.', '08:00', '21:00', false),
  ('11111111-0000-0000-0000-000000000002', 'Central Library', 'Library', 'library', 30.3522000, 76.3620000, 3, 'Reading halls and digital library.', '08:00', '22:00', false),
  ('11111111-0000-0000-0000-000000000003', 'Main Canteen', 'Canteen', 'food', 30.3518000, 76.3615000, 1, 'Campus food court.', '07:00', '22:00', false),
  ('11111111-0000-0000-0000-000000000004', 'Sports Complex', 'Sports', 'sports', 30.3517000, 76.3599000, 2, 'Indoor courts and gym.', '06:00', '21:00', false),
  ('11111111-0000-0000-0000-000000000005', 'Boys Hostel B', 'Hostel B', 'hostel', 30.3532000, 76.3603000, 6, 'Student residence block.', null, null, true);

insert into public.rooms (id, building_id, room_code, floor, capacity, room_type)
values
  ('22222222-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001', 'E204', 2, 80, 'classroom'),
  ('22222222-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000001', 'Lab 3', 1, 40, 'lab'),
  ('22222222-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000002', 'L-2', 2, 120, 'seminar'),
  ('22222222-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000001', 'C101', 1, 72, 'classroom'),
  ('22222222-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000001', 'C102', 1, 72, 'classroom'),
  ('22222222-0000-0000-0000-000000000006', '11111111-0000-0000-0000-000000000001', 'D301', 3, 90, 'classroom'),
  ('22222222-0000-0000-0000-000000000007', '11111111-0000-0000-0000-000000000002', 'Digital Lab', 1, 50, 'lab'),
  ('22222222-0000-0000-0000-000000000008', '11111111-0000-0000-0000-000000000004', 'Indoor Court', 0, 200, 'auditorium'),
  ('22222222-0000-0000-0000-000000000009', '11111111-0000-0000-0000-000000000002', 'Seminar Hall', 0, 160, 'seminar'),
  ('22222222-0000-0000-0000-000000000010', '11111111-0000-0000-0000-000000000001', 'Project Lab', 2, 32, 'lab');

insert into public.societies (id, name, slug, category, description, email, instagram_url, is_active)
values
  ('33333333-0000-0000-0000-000000000001', 'Thapar Coding Club', 'thapar-coding-club', 'technical', 'Competitive programming and hackathons.', 'coding@thapar.edu', 'https://instagram.com', true),
  ('33333333-0000-0000-0000-000000000002', 'Zeitgeist Cultural Society', 'zeitgeist', 'cultural', 'Music, theatre, dance, and culture nights.', 'zeitgeist@thapar.edu', 'https://instagram.com', true),
  ('33333333-0000-0000-0000-000000000003', 'NSS Thapar', 'nss-thapar', 'social', 'Volunteer drives and social impact programs.', 'nss@thapar.edu', null, true);

insert into public.shops (building_id, name, category, description, phone, opening_time, closing_time, is_24hrs, is_open, location_note)
values
  ('11111111-0000-0000-0000-000000000003', 'Wraps & More', 'food', 'Rolls, sandwiches, cold coffee, and meal combos.', '+91 XXXXX XXXXX', '08:00', '22:00', false, true, 'Counter 3, main canteen'),
  ('11111111-0000-0000-0000-000000000001', 'Campus Print Desk', 'printing', 'Printouts, binding, reports, and stationery.', '+91 XXXXX XXXXX', '09:00', '18:00', false, true, 'Ground floor near staircase'),
  ('11111111-0000-0000-0000-000000000005', 'Hostel ATM', 'atm', 'Cash withdrawal kiosk near hostel entrance.', null, null, null, true, true, 'Gate lobby');

insert into public.events (id, title, description, event_type, society_id, building_id, room_id, venue_note, start_time, end_time, registration_deadline, max_capacity, current_registrations, ticket_price, tags, requires_registration, is_published)
values
  ('44444444-0000-0000-0000-000000000001', 'Freshers Orientation Evening', 'Official welcome session and campus resource briefing.', 'thapar_official', null, '11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001', 'E Block auditorium wing', now() + interval '4 hours', now() + interval '6 hours', now() + interval '2 hours', 180, 96, 0, array['orientation','official'], true, true),
  ('44444444-0000-0000-0000-000000000002', 'HackNight: Build for Campus', 'Six-hour build sprint for everyday student problems.', 'workshop', '33333333-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000002', '22222222-0000-0000-0000-000000000003', null, now() + interval '30 hours', null, now() + interval '20 hours', 80, 72, 0, array['hackathon','coding','team'], true, true),
  ('44444444-0000-0000-0000-000000000003', 'Courtyard Open Mic', 'Poetry, stand-up, acoustic music, and spoken word.', 'society', '33333333-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000003', null, 'Outdoor seating area', now() + interval '52 hours', null, now() + interval '44 hours', 120, 33, 0, array['culture','music'], true, true),
  ('44444444-0000-0000-0000-000000000004', 'NSS Donation Drive', 'Draft event placeholder.', 'society', '33333333-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000004', null, 'Sports complex entrance', now() + interval '80 hours', null, now() + interval '70 hours', 200, 0, 0, array['volunteer'], true, false);

insert into public.timetable_slots (branch, semester, section, subject_name, subject_code, faculty_name, room_id, day_of_week, start_time, end_time)
values
  ('CSE', 5, 'A', 'Operating Systems', 'UCS303', 'Dr. K. Sharma', '22222222-0000-0000-0000-000000000001', 1, '09:00', '09:50'),
  ('CSE', 5, 'A', 'Database Systems Lab', 'UCS310', 'Prof. A. Bedi', '22222222-0000-0000-0000-000000000002', 1, '10:00', '11:50'),
  ('CSE', 5, 'A', 'Computer Networks', 'UCS304', 'Dr. R. Saini', '22222222-0000-0000-0000-000000000003', 2, '11:00', '11:50'),
  ('CSE', 5, 'A', 'Software Engineering', 'UCS305', 'Dr. N. Kaur', '22222222-0000-0000-0000-000000000001', 3, '12:00', '12:50'),
  ('CSE', 5, 'A', 'AI Fundamentals', 'UCS411', 'Dr. S. Singh', '22222222-0000-0000-0000-000000000003', 4, '14:00', '14:50'),
  ('CSE', 5, 'A', 'Compiler Design', 'UCS402', 'Dr. P. Rao', '22222222-0000-0000-0000-000000000004', 5, '09:00', '09:50'),
  ('CSE', 5, 'A', 'Computer Networks Lab', 'UCS314', 'Dr. R. Saini', '22222222-0000-0000-0000-000000000007', 5, '10:00', '11:50'),
  ('CSE', 5, 'A', 'Project Studio', 'UCS399', 'Prof. A. Bedi', '22222222-0000-0000-0000-000000000010', 6, '11:00', '12:50');
