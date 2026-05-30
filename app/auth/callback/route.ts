import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (code) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (url && key && !url.includes('your_')) {
      const supabase = createServerClient(url, key, {
        cookies: {
          get(name: string) {
            return undefined // Handling set/remove via middleware/response
          },
          set(name: string, value: string, options) {
            // we don't strictly need this in a GET handler that redirects
          },
          remove(name: string, options) {
          },
        },
      })
      
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}
