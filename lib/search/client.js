import fetch from 'isomorphic-fetch'

const dev = process.env.NODE_ENV === 'development'
const domain = dev ? 'http://localhost:3000' : 'https://gugul.io'

export default async (query) => {
  if (!query) return Promise.resolve([])

  const res = await fetch(`${domain}/api/search?q=${query}`)

  if (res.status < 200 || res.status >= 300) {
    const err = new Error(res.statusText)
    err.res = res
    err.status = res.status
    throw err
  }

  return res.json()
}
