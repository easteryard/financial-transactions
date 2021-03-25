import { format } from 'date-fns'

export function capitalizeFirstLetter (value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function formatAmountWithCurrencyCode (currencyCode: string, value: number) {
  const amount = new Intl.NumberFormat('en-US').format(value)
  return `${currencyCode} ${amount}`
}

export function formatTime (time: string, dateFormat = 'yyyy-MM-dd HH:mm:ss') {
  const date = new Date(time)
  return format(date, dateFormat)
}
