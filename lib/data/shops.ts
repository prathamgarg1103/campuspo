// Campus shops organized by area segments
// COS = Centre of Services, G-Block, H-Block

export type ShopSegment = 'cos' | 'gblock' | 'hblock'

export interface CampusShop {
  id: string
  name: string
  segment: ShopSegment
  category: 'food' | 'stationery' | 'salon' | 'atm' | 'printing' | 'grocery' | 'medical' | 'laundry' | 'electronics' | 'clothing' | 'juice' | 'cafe' | 'photography' | 'pizza' | 'other'
  description: string
  phone?: string
  opening_time?: string
  closing_time?: string
  is_open: boolean
}

export const SEGMENT_INFO: Record<ShopSegment, { label: string; description: string }> = {
  cos: { label: 'COS Complex', description: 'Centre of Services — main commercial hub on campus' },
  gblock: { label: 'G-Block', description: 'Shops and eateries near G-Block hostels' },
  hblock: { label: 'H-Block', description: 'Shops and services near H-Block hostels' },
}

export const CAMPUS_SHOPS: CampusShop[] = [
  // ────────────────────── COS COMPLEX (from official directory) ──────────────────────
  {
    id: 'cos-01-vitamin',
    name: '01 Vitamin Store',
    segment: 'cos',
    category: 'grocery',
    description: 'Cosmetics, offering an array of fashion and beauty products.',
    phone: '+91 98159 19808',
    is_open: true,
  },
  {
    id: 'cos-02-shadows',
    name: "02 Shadow's Salon and Spa",
    segment: 'cos',
    category: 'salon',
    description: 'Your one-stop shop for beauty and fashion — haircuts, grooming, and spa services.',
    phone: '+91 98159 19808',
    is_open: true,
  },
  {
    id: 'cos-03-fashion',
    name: '03 Fashion Point',
    segment: 'cos',
    category: 'clothing',
    description: 'A stylish range of cosmetics, home and lifestyle accessories.',
    is_open: true,
  },
  {
    id: 'cos-04-stationery',
    name: '04 Stationery Store',
    segment: 'cos',
    category: 'stationery',
    description: 'Comprehensive range of articles for academic and university needs.',
    phone: '+91 81468 64418',
    is_open: true,
  },
  {
    id: 'cos-05-photography',
    name: '05 RS Photography',
    segment: 'cos',
    category: 'photography',
    description: 'Passport photos, ID prints, event photography, and photo printing services.',
    phone: '+91 98728 24062',
    is_open: true,
  },
  {
    id: 'cos-06-dessert',
    name: '06 Dessert Club',
    segment: 'cos',
    category: 'food',
    description: 'A sweet paradise offering waffles, buns, and a variety of refreshing beverages.',
    is_open: true,
  },
  {
    id: 'cos-07-pizza',
    name: '07 Pizza Nation',
    segment: 'cos',
    category: 'pizza',
    description: 'Handmade thin-crust baked pizzas, burgers, sandwiches, and pre-cooked food products.',
    phone: '+91 98553 07695',
    is_open: true,
  },
  {
    id: 'cos-08-kabir',
    name: '08 Kabir Multi-Store',
    segment: 'cos',
    category: 'grocery',
    description: 'General store with snacks, beverages, toiletries, and daily essentials.',
    is_open: true,
  },
  {
    id: 'cos-09-honey',
    name: '09 Honey Coffee Cafe',
    segment: 'cos',
    category: 'cafe',
    description: 'A cozy café where you can find appealing fresh coffee, beverages, and light bites.',
    is_open: true,
  },
  {
    id: 'cos-09-iqbal',
    name: '09 Iqbal Juice Centre',
    segment: 'cos',
    category: 'juice',
    description: 'Fresh fruit juices, smoothies, shakes, and seasonal specials.',
    is_open: true,
  },
  {
    id: 'cos-10-laundry',
    name: '10 Laundry',
    segment: 'cos',
    category: 'laundry',
    description: 'Basic press, coat ironing, wash and fold services for your daily needs.',
    phone: '+91 98727 05895',
    is_open: true,
  },
  // ────────────────────── G-BLOCK ──────────────────────
  {
    id: 'gb-canteen',
    name: 'G-Block Canteen',
    segment: 'gblock',
    category: 'food',
    description: 'Full meals, paranthas, rice bowls, and campus favourites.',
    opening_time: '07:30',
    closing_time: '23:00',
    is_open: true,
  },
  {
    id: 'gb-maggi',
    name: 'Maggi Point',
    segment: 'gblock',
    category: 'food',
    description: 'Maggi, pasta, sandwiches, and late-night snacks.',
    opening_time: '10:00',
    closing_time: '01:00',
    is_open: true,
  },
  {
    id: 'gb-juice',
    name: 'Fresh Juice & Shakes',
    segment: 'gblock',
    category: 'juice',
    description: 'Seasonal fruit juices, protein shakes, and milkshakes.',
    opening_time: '09:00',
    closing_time: '22:00',
    is_open: true,
  },
  {
    id: 'gb-grocery',
    name: 'G-Block General Store',
    segment: 'gblock',
    category: 'grocery',
    description: 'Chips, biscuits, cold drinks, toiletries, and instant noodles.',
    opening_time: '08:00',
    closing_time: '23:00',
    is_open: true,
  },
  {
    id: 'gb-photocopy',
    name: 'G-Block Photocopy',
    segment: 'gblock',
    category: 'printing',
    description: 'Quick printouts, photocopies, and document scanning.',
    opening_time: '09:00',
    closing_time: '20:00',
    is_open: true,
  },
  {
    id: 'gb-laundry',
    name: 'G-Block Laundry',
    segment: 'gblock',
    category: 'laundry',
    description: 'Laundry pickup, wash, and iron services.',
    opening_time: '08:00',
    closing_time: '20:00',
    is_open: true,
  },
  {
    id: 'gb-salon',
    name: 'G-Block Salon',
    segment: 'gblock',
    category: 'salon',
    description: 'Haircuts and grooming near the hostel area.',
    opening_time: '10:00',
    closing_time: '20:00',
    is_open: true,
  },
  // ────────────────────── H-BLOCK ──────────────────────
  {
    id: 'hb-canteen',
    name: 'H-Block Canteen',
    segment: 'hblock',
    category: 'food',
    description: 'South Indian, North Indian thalis, and snack combos.',
    opening_time: '07:30',
    closing_time: '23:00',
    is_open: true,
  },
  {
    id: 'hb-tea',
    name: 'Tea & Snacks Stall',
    segment: 'hblock',
    category: 'food',
    description: 'Chai, samosa, bread pakora, and evening snacks.',
    opening_time: '06:00',
    closing_time: '22:00',
    is_open: true,
  },
  {
    id: 'hb-grocery',
    name: 'H-Block General Store',
    segment: 'hblock',
    category: 'grocery',
    description: 'Daily essentials, snacks, beverages, and instant food.',
    opening_time: '08:00',
    closing_time: '23:00',
    is_open: true,
  },
  {
    id: 'hb-photocopy',
    name: 'H-Block Photocopy',
    segment: 'hblock',
    category: 'printing',
    description: 'Printouts, photocopies, and report binding.',
    opening_time: '09:00',
    closing_time: '19:00',
    is_open: true,
  },
  {
    id: 'hb-laundry',
    name: 'H-Block Laundry',
    segment: 'hblock',
    category: 'laundry',
    description: 'Wash, dry, and iron with same-day delivery.',
    opening_time: '08:00',
    closing_time: '20:00',
    is_open: true,
  },
  {
    id: 'hb-electronics',
    name: 'Mobile Repair & Accessories',
    segment: 'hblock',
    category: 'electronics',
    description: 'Phone repairs, charging cables, earphones, and accessories.',
    opening_time: '10:00',
    closing_time: '20:00',
    is_open: true,
  },
]

export const SHOP_CATEGORY_COLORS: Record<CampusShop['category'], string> = {
  food: 'bg-orange-50 text-orange-600',
  cafe: 'bg-amber-50 text-amber-700',
  juice: 'bg-lime-50 text-lime-600',
  stationery: 'bg-blue-50 text-blue-600',
  salon: 'bg-pink-50 text-pink-600',
  atm: 'bg-emerald-50 text-emerald-600',
  printing: 'bg-violet-50 text-violet-600',
  grocery: 'bg-cyan-50 text-cyan-600',
  medical: 'bg-red-50 text-red-600',
  laundry: 'bg-sky-50 text-sky-600',
  electronics: 'bg-indigo-50 text-indigo-600',
  clothing: 'bg-fuchsia-50 text-fuchsia-600',
  photography: 'bg-teal-50 text-teal-600',
  pizza: 'bg-red-50 text-red-700',
  other: 'bg-slate-50 text-slate-600',
}

// Segment colors
export const SEGMENT_COLORS: Record<ShopSegment, string> = {
  cos: 'from-brand-600 to-brand-700',
  gblock: 'from-emerald-600 to-emerald-700',
  hblock: 'from-violet-600 to-violet-700',
}
