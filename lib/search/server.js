const config = require('dos-config')
const rateLimiter = require('./rate-limiter')

const searcher = require(`./searchers/${config.searcher}`)
const rate = rateLimiter(searcher.maxStack, searcher.burnInterval)

module.exports = async (query) => {
  if (typeof query !== 'string') {
    throw new Error('Invalid query param')
  }

  if (!query) return []

  if (query.length > 1500) {
    throw new Error('Query too long, maximum length is 1500 chars')
  }

  if (rate.limit()) throw new Error('Too Many Requests')

  const { results } = await searcher.search(query)

  return results
}
