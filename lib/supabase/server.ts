import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your_') &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('your_'),
  )
}

export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase server client is not configured.')
  }

  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {},
        remove() {},
      },
    },
  )
}
