export function save(key, value) {
  localStorage.setItem(key, value)
}
export function get(key) {
  return localStorage.getItem(key)
}

export function remove(key, isALL) {
  if (!isALL) localStorage.removeItem(key)
  else {
    localStorage.clear()
  }
  return true
}