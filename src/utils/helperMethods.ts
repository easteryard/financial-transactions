export function capitalizeFirstLetter (value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function getFormattedAmount (currencyCode: string, value: number) {
  const amount = new Intl.NumberFormat('en-US').format(value)
  return `${currencyCode} ${amount}`
}
