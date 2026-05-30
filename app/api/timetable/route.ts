import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Cache the data in memory
let cachedData: any = null

function getTimetableData() {
  if (cachedData) return cachedData
  
  try {
    const filePath = path.join(process.cwd(), 'lib', 'data', 'timetable-data.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    cachedData = JSON.parse(fileContents)
    return cachedData
  } catch (error) {
    console.error('Error loading timetable data:', error)
    return null
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const reqSheets = searchParams.get('sheets')
  const reqSheet = searchParams.get('sheet')
  const reqClasses = searchParams.get('classes')
  const reqClass = searchParams.get('class')

  const data = getTimetableData()

  if (!data) {
    return NextResponse.json({ error: 'Failed to load timetable data' }, { status: 500 })
  }

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

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}
