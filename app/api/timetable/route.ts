import { NextRequest, NextResponse } from 'next/server'
import { sampleTimetable } from '@/lib/data/sample'
import timetableData from '@/lib/data/timetable-data.json'

type TimetableCell = {
  course: string
  color: string
}

type TimetableData = Record<string, Record<string, TimetableCell[][]>>

const data = timetableData as TimetableData

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const reqSheets = searchParams.get('sheets')
  const reqSheet = searchParams.get('sheet')
  const reqClasses = searchParams.get('classes')
  const reqClass = searchParams.get('class')
  const reqBranch = searchParams.get('branch')
  const reqSemester = searchParams.get('semester')
  const reqSection = searchParams.get('section')

  // ?sheets=true
  if (reqSheets === 'true') {
    const sheets = Object.keys(data).sort()
    return NextResponse.json({ sheets })
  }

  // ?sheet=...&classes=true
  if (reqSheet && reqClasses === 'true') {
    const sheetData = data[reqSheet]
    if (!sheetData) {
      return NextResponse.json({ error: 'Sheet not found' }, { status: 404 })
    }
    const classes = Object.keys(sheetData).sort()
    return NextResponse.json({ classes })
  }

  // ?sheet=...&class=...
  if (reqSheet && reqClass) {
    const sheetData = data[reqSheet]
    if (!sheetData) {
      return NextResponse.json({ error: 'Sheet not found' }, { status: 404 })
    }
    const classData = sheetData[reqClass]
    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 })
    }
    return NextResponse.json({ timetable: classData })
  }

  // Backwards-compatible response for the older hook shape.
  // The main timetable UI uses sheet/class data above.
  if (reqBranch && reqSemester) {
    const semesterNumber = Number(reqSemester)
    const slots = sampleTimetable.filter(
      (slot) =>
        slot.branch === reqBranch &&
        slot.semester === semesterNumber &&
        (!reqSection || slot.section === reqSection),
    )
    return NextResponse.json(slots.length > 0 ? slots : sampleTimetable)
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}
