const google = require('google')

const dev = process.env.NODE_ENV !== 'production'

google.resultsPerPage = 25

// Limit te search rate to maximum 4 calls per minute,
// enabling one every 20 secs
const rate = {
  count: 0,
  max: 4,
  limit: () => {
    if (rate.count === rate.max) return true
    rate.count++
    return false
  },
  release: () => !!rate.count && !!--rate.count
}

setInterval(rate.release, 1000 * 20)

module.exports = function search (query) {
  if (!query) return Promise.resolve([])

  if (!dev && rate.limit()) {
    return Promise.reject(new Error('Too Many Requests'))
  }

  // On development, use dummy results
  if (dev) {
    const dummyResults = require('./example.json').sort(() => rand(-1, 1))

    return new Promise((resolve) => {
      setTimeout(() => resolve(dummyResults), rand(200, 1500))
    })
  }

  return new Promise((resolve, reject) => {
    google(query, (err, res) => {
      if (err) return reject(err)
      resolve(res.links)
    })
  })
}

function rand (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
