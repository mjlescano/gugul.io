import 'whatwg-fetch'

let search = async (query) => {
  const res = await window.fetch(`/api/search?q=${query}`)

  if (res.status < 200 || res.status >= 300) {
    const err = new Error(res.statusText)
    err.res = res
    err.status = res.status
    throw err
  }

  return await res.json()
}

module.exports = function searchClient (query) {
  if (!query) return Promise.resolve([])
  return search(query)
}

if (typeof window === 'undefined') {
  search = require('.')
}
