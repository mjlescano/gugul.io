const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const search = require('./lib/search')

const dev = process.env.NODE_ENV !== 'production'
const PORT = 3000

const app = next({ dev })
const handle = app.getRequestHandler()

const handleSearch = async (req, res, parsedUrl) => {
  const { query: { q } } = parsedUrl

  res.setHeader('Content-Type', 'application/json')

  if (!q) {
    res.statusCode = 200
    return res.end('[]')
  }

  try {
    const links = await search(q)
    res.statusCode = 200
    res.end(JSON.stringify(links))
  } catch (err) {
    if (dev) console.error(err)

    if (err.message === 'Too Many Requests') {
      res.statusCode = 429
    } else {
      res.statusCode = 500
    }

    res.end()
  }
}

const init = async () => {
  await app.prepare()

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (req.method === 'GET' && pathname === '/api/search') {
      handleSearch(req, res, parsedUrl)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(PORT, (err) => {
    if (err) throw err
  })
}

init()
