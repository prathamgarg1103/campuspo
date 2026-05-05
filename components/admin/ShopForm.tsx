import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function ShopForm() {
  return (
    <form className="grid gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">Shop name<Input placeholder="Campus Print Desk" /></label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">Category<Select><option>food</option><option>stationery</option><option>printing</option><option>atm</option><option>other</option></Select></label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">Description<Textarea /></label>
      <Button className="w-fit">Save shop</Button>
    </form>
  )
}
