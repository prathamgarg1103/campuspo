'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

type TimetableCell = {
  course: string
  color: string
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

export default function TimetablePage() {
  const [sheets, setSheets] = useState<string[]>([])
  const [classes, setClasses] = useState<string[]>([])
  
  const [selectedSheet, setSelectedSheet] = useState<string>('')
  const [selectedClass, setSelectedClass] = useState<string>('')
  
  const [timetable, setTimetable] = useState<TimetableCell[][]>([])
  
  const [loadingSheets, setLoadingSheets] = useState(true)
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [loadingTimetable, setLoadingTimetable] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedSheet = localStorage.getItem('campusgo_timetable_sheet')
    const savedClass = localStorage.getItem('campusgo_timetable_class')
    if (savedSheet) setSelectedSheet(savedSheet)
    if (savedClass) setSelectedClass(savedClass)
  }, [])

  // Fetch sheets on mount
  useEffect(() => {
    const controller = new AbortController()

    const fetchSheets = async () => {
      try {
        const res = await fetch('/api/timetable?sheets=true', { signal: controller.signal })
        if (!res.ok) return
        const data = await res.json()
        if (data.sheets) {
          setSheets(data.sheets)
        }
      } catch (error) {
        if (!isAbortError(error)) {
          setSheets([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingSheets(false)
        }
      }
    }

    fetchSheets()
    return () => controller.abort()
  }, [])

  // Fetch classes when sheet changes
  useEffect(() => {
    if (!selectedSheet) {
      setClasses([])
      setSelectedClass('')
      setTimetable([])
      return
    }

    const controller = new AbortController()

    const fetchClasses = async () => {
      setLoadingClasses(true)
      setSelectedClass('')
      setTimetable([])
      try {
        const res = await fetch(`/api/timetable?sheet=${encodeURIComponent(selectedSheet)}&classes=true`, {
          signal: controller.signal,
        })
        if (!res.ok) return
        const data = await res.json()
        if (data.classes) {
          setClasses(data.classes)
        }
      } catch (error) {
        if (!isAbortError(error)) {
          setClasses([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingClasses(false)
        }
      }
    }

    fetchClasses()
    return () => controller.abort()
  }, [selectedSheet])

  // Fetch timetable when class changes
  useEffect(() => {
    if (!selectedSheet || !selectedClass) {
      setTimetable([])
      return
    }

    const controller = new AbortController()

    const fetchTimetable = async () => {
      setLoadingTimetable(true)
      try {
        const res = await fetch(`/api/timetable?sheet=${encodeURIComponent(selectedSheet)}&class=${encodeURIComponent(selectedClass)}`, {
          signal: controller.signal,
        })
        if (!res.ok) return
        const data = await res.json()
        if (data.timetable) {
          setTimetable(data.timetable)
        }
      } catch (error) {
        if (!isAbortError(error)) {
          setTimetable([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingTimetable(false)
        }
      }
    }

    fetchTimetable()
    return () => controller.abort()
  }, [selectedSheet, selectedClass])

  const getColorClass = (color: string) => {
    switch (color) {
      case 'danger': return 'bg-rose-100 text-rose-800 border-rose-200'
      case 'primary': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'info': return 'bg-cyan-100 text-cyan-800 border-cyan-200'
      case 'success': return 'bg-emerald-50 text-emerald-600 border-emerald-100' // free slots usually
      case 'dark': return 'bg-slate-800 text-slate-100 border-slate-700 font-medium'
      case '': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-50 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Timetable</h1>
        <p className="text-slate-500 mt-1">View your weekly class schedule</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Year Group</label>
              <select 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50 bg-white"
                value={selectedSheet}
                onChange={(e) => {
                  const val = e.target.value
                  setSelectedSheet(val)
                  localStorage.setItem('campusgo_timetable_sheet', val)
                }}
                disabled={loadingSheets}
              >
                <option value="">Select Year Group</option>
                {sheets.map(sheet => (
                  <option key={sheet} value={sheet}>{sheet}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Class / Section</label>
              <select 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50 bg-white"
                value={selectedClass}
                onChange={(e) => {
                  const val = e.target.value
                  setSelectedClass(val)
                  localStorage.setItem('campusgo_timetable_class', val)
                }}
                disabled={!selectedSheet || loadingClasses}
              >
                <option value="">Select Class</option>
                {classes.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {loadingTimetable && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        </div>
      )}

      {!loadingTimetable && timetable.length > 0 && (
        <Card className="overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {timetable.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => {
                      const isHeaderRow = rowIndex === 0;
                      const isTimeCol = colIndex === 0;
                      const Tag = isHeaderRow ? 'th' : 'td';
                      
                      // Sometimes empty course names denote free slots
                      const displayCourse = cell.course.trim() === '' ? 'FREE' : cell.course;
                      
                      return (
                        <Tag 
                          key={colIndex}
                          className={`
                            border p-3 text-center transition-colors
                            ${getColorClass(cell.color)}
                            ${isHeaderRow ? 'whitespace-nowrap py-4' : ''}
                            ${isTimeCol ? 'font-medium whitespace-nowrap' : 'min-w-[150px] max-w-[200px]'}
                          `}
                        >
                          {displayCourse}
                        </Tag>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {!loadingTimetable && selectedSheet && selectedClass && timetable.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-slate-500">
            No timetable data found for this class.
          </CardContent>
        </Card>
      )}

      {!selectedSheet && !selectedClass && !loadingSheets && (
        <Card>
          <CardContent className="p-12 text-center text-slate-500">
            Select a year group and class to view your timetable.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
