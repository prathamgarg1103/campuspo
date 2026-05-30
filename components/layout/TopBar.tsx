'use client'

import { Search, LogOut } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { NotificationBell } from '@/components/layout/NotificationBell'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { createBrowserClient } from '@supabase/ssr'

export function TopBar({ title }: { title: string }) {
  const handleSignOut = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supabaseUrl && supabaseKey) {
      const supabase = createBrowserClient(supabaseUrl, supabaseKey)
      await supabase.auth.signOut()
      window.location.href = '/login'
    }
  }

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 px-4 backdrop-blur md:px-6">
      <div>
        <p className="text-xs text-slate-500">{process.env.NEXT_PUBLIC_CAMPUS_NAME ?? 'Thapar Institute of Engineering & Technology'}</p>
        <h1 className="text-sm font-semibold text-slate-950 dark:text-slate-50">{title}</h1>
      </div>
      <div className="hidden max-w-sm flex-1 items-center md:flex">
        <label className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input className="pl-9" placeholder="Search events, rooms, shops" />
        </label>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <NotificationBell />
        <button 
          onClick={handleSignOut} 
          className="p-2 text-slate-500 hover:text-red-500 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Sign Out"
        >
          <LogOut className="size-5" />
        </button>
      </div>
    </header>
  )
}
