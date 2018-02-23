module.exports = (maxStack = 10, burnInterval = 100) => {
  const rate = {
    count: 0,
    max: maxStack,
    limit: () => {
      if (rate.count === rate.max) return true
      rate.count++
      return false
    },
    release: () => !!rate.count && !!--rate.count
  }

  setInterval(rate.release, burnInterval)

  return rate
}
