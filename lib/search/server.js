const config = require('dos-config')
const rateLimiter = require('./rate-limiter')

const searcher = require(`./searchers/${config.searcher}`)
const rate = rateLimiter(searcher.maxStack, searcher.burnInterval)

module.exports = async (query) => {
  if (!query) return []

  if (rate.limit()) throw new Error('Too Many Requests')

  const { results } = await searcher.search(query)

  return results
}
