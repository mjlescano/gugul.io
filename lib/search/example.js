function rand (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = () => {
  const dummyResults = require('./example.json').sort(() => rand(-1, 1))

  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyResults), rand(200, 1500))
  })
}
