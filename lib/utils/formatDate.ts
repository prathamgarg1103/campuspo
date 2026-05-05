import { format, formatDistanceToNowStrict, isToday, parseISO } from 'date-fns'

export function formatEventDate(value: string) {
  const date = parseISO(value)
  return isToday(date) ? `Today, ${format(date, 'p')}` : format(date, 'EEE, MMM d, p')
}

export function timeUntil(value: string) {
  return formatDistanceToNowStrict(parseISO(value), { addSuffix: true })
}
