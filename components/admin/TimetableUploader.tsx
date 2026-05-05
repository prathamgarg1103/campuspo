import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function TimetableUploader() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-950">CSV timetable import</h2>
      <p className="mt-1 text-sm text-slate-500">TODO: FILL IN REAL DATA. Upload columns: branch, semester, section, subject, faculty, room, day, start_time, end_time.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Input type="file" accept=".csv" />
        <Button>Upload CSV</Button>
      </div>
    </div>
  )
}
