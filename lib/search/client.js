import 'whatwg-fetch'

module.exports = function search (query) {
  if (!query) return Promise.resolve([])

  return window.fetch('/api/search?q=' + query)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res

      const err = new Error(res.statusText)
      err.res = res
      err.status = res.status
      throw err
    })
    .then((res) => res.json())
}
