export function currencyFormat(num) {
  return "$" + num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export function getFullAddress(addressLine, town, state, country) {
  return `${addressLine},${town},${state},${country}`
}
