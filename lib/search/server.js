const { promisify } = require('util')
const google = require('google')
const example = require('./example')
const rate = require('./rate-limiter')

const dev = process.env.NODE_ENV !== 'production'

google.resultsPerPage = 25

const search = promisify(google.bind(google))

module.exports = async (query) => {
  if (!query) return []

  if (!dev && rate.limit()) throw new Error('Too Many Requests')

  if (dev) return example()

  const { links } = search(query)

  return links
}
