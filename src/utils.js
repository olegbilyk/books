export function arrayToMap(arr) {
  return arr.reduce((acc, el) => ({
    ...acc, [el.name]: el
  }), {})
}

export function mapToArr(arr) {
  return Object.keys(arr).map(id => arr[id])
}
