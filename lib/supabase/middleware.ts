import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const pathname = request.nextUrl.pathname
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/auth')
  const hasDemoSession = request.cookies.get('campusgo-demo-session')?.value === 'student'

  if (hasDemoSession) {
    if (pathname === '/login') {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/'
      return NextResponse.redirect(redirectUrl)
    }

    return response
  }

  if (!url || !key || url.includes('your_') || key.includes('your_')) {
    if (!isAuthRoute) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/login'
      return NextResponse.redirect(redirectUrl)
    }
    return response
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options) {
        request.cookies.set({ name, value, ...options })
        response = NextResponse.next({ request })
        response.cookies.set({ name, value, ...options })
      },
      remove(name: string, options) {
        request.cookies.set({ name, value: '', ...options })
        response = NextResponse.next({ request })
        response.cookies.set({ name, value: '', ...options })
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()

  // If there's no user and we are not on an auth route, redirect to login
  if (!user && !isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If user is logged in but tries to access login page, send to home
  if (user && isAuthRoute && pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // Enforce @thapar.edu domain checking if they are logged in
  if (user && !user.email?.endsWith('@thapar.edu')) {
    // Force sign out if somehow they bypassed (though Google OAuth config should block this)
    await supabase.auth.signOut()
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('error', 'domain')
    return NextResponse.redirect(url)
  }

  return response
}
