// Limit te search rate to maximum 4 calls per minute,
// enabling one every 20 secs

const MAX_CALLS = 4
const BURN_RATE = 1000 * 20

const rate = {
  count: 0,
  max: MAX_CALLS,
  limit: () => {
    if (rate.count === rate.max) return true
    rate.count++
    return false
  },
  release: () => !!rate.count && !!--rate.count
}

setInterval(rate.release, BURN_RATE)

module.exports = rate
