'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search, Mail, User, ExternalLink, Filter, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  THAPAR_ORGS,
  ORG_TYPE_COLORS,
  ORG_CATEGORY_COLORS,
  getLogoUrl,
  type OrgType,
  type OrgCategory,
  type ThaparOrg,
} from '@/lib/data/societies'

const typeLabels: Record<OrgType, string> = {
  society: 'Society',
  club: 'Club',
  chapter: 'Chapter',
  cell: 'Cell',
  unit: 'Unit',
}

const categoryLabels: Record<OrgCategory, string> = {
  technical: 'Technical',
  entrepreneurship: 'Entrepreneurship',
  cultural: 'Cultural',
  social: 'Social',
  academic: 'Academic',
  sports: 'Sports',
  media: 'Media',
  other: 'Other',
}

const allTypes: OrgType[] = ['society', 'club', 'chapter', 'cell', 'unit']
const allCategories: OrgCategory[] = ['technical', 'entrepreneurship', 'cultural', 'social', 'academic', 'sports', 'media', 'other']

function OrgCard({ org }: { org: ThaparOrg }) {
  return (
    <Card className="group flex flex-col overflow-hidden transition hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-slate-100">
              <Image
                src={getLogoUrl(org.id)}
                alt={`${org.name} logo`}
                fill
                className="object-contain p-1"
                sizes="48px"
              />
            </div>
            <div>
              <CardTitle className="text-sm leading-tight">{org.name}</CardTitle>
              <span className="mt-0.5 text-xs text-slate-400">{org.short_name}</span>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge className={ORG_TYPE_COLORS[org.type]}>{typeLabels[org.type]}</Badge>
          <Badge className={ORG_CATEGORY_COLORS[org.category]}>{categoryLabels[org.category]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="line-clamp-3 text-sm text-slate-500">{org.description}</p>

        <div className="mt-auto space-y-1.5 text-xs text-slate-400">
          {org.email && (
            <a href={`mailto:${org.email}`} className="flex items-center gap-1.5 transition hover:text-brand-600">
              <Mail className="size-3" /> {org.email}
            </a>
          )}
          {org.coordinator && (
            <span className="flex items-center gap-1.5">
              <User className="size-3" /> {org.coordinator}
            </span>
          )}
          {org.website && (
            <a href={org.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition hover:text-brand-600">
              <ExternalLink className="size-3" /> Website
            </a>
          )}
        </div>

        <a
          href={org.apply_url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-8 w-full items-center justify-center gap-1.5 rounded-full bg-brand-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Apply <ArrowUpRight className="size-3" />
        </a>
      </CardContent>
    </Card>
  )
}

export default function SocietiesPage() {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState<OrgType | 'all'>('all')
  const [activeCategory, setActiveCategory] = useState<OrgCategory | 'all'>('all')

  const filtered = useMemo(() => {
    let list = THAPAR_ORGS
    if (activeType !== 'all') list = list.filter((o) => o.type === activeType)
    if (activeCategory !== 'all') list = list.filter((o) => o.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          o.short_name.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q),
      )
    }
    return list
  }, [activeType, activeCategory, search])

  // Counts for type badges
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: THAPAR_ORGS.length }
    allTypes.forEach((t) => (counts[t] = THAPAR_ORGS.filter((o) => o.type === t).length))
    return counts
  }, [])

  return (
    <div className="space-y-6 p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-950">Societies & Clubs</h2>
        <p className="mt-1 text-sm text-slate-500">
          57 official student organizations at Thapar Institute of Engineering & Technology
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          className="pl-9"
          placeholder="Search societies, clubs, chapters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Type filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', ...allTypes] as const).map((type) => {
          const isActive = activeType === type
          const label = type === 'all' ? 'All' : typeLabels[type]
          const count = typeCounts[type]
          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
              }`}
            >
              {label} <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-slate-400'}`}>({count})</span>
            </button>
          )
        })}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="size-3.5 text-slate-400" />
        {(['all', ...allCategories] as const).map((cat) => {
          const isActive = activeCategory === cat
          const label = cat === 'all' ? 'All Categories' : categoryLabels[cat]
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Results count */}
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((org) => (
            <OrgCard key={org.id} org={org} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 py-16 text-center">
          <p className="text-sm text-slate-400">No organizations match your search.</p>
        </div>
      )}
    </div>
  )
}
