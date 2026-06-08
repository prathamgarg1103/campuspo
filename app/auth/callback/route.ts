import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? requestUrl.origin
  
  if (code) {
    const cookieStore = cookies()
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (url && key && !url.includes('your_')) {
      const supabase = createServerClient(url, key, {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options) {
            cookieStore.delete({ name, ...options })
          },
        },
      })
      
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        return NextResponse.redirect(new URL('/', appUrl))
      } else {
        console.error('Auth error:', error)
      }
    }
  }

  return NextResponse.redirect(new URL('/login?error=true', appUrl))
}
