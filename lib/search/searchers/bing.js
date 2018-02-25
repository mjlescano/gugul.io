const https = require('https')
const config = require('dos-config')

const HOSTNAME = 'api.cognitive.microsoft.com'
const PATH = '/bing/v7.0/search'
const KEY = config.bing.key

module.exports = {
  maxStack: 10,
  burnInterval: 100,
  search: (query) => new Promise((resolve, reject) => {
    https.get({
      hostname: HOSTNAME,
      path: `${PATH}?q=${encodeURIComponent(query)}`,
      headers: { 'Ocp-Apim-Subscription-Key': KEY }
    }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error('Search server error.'))
      }

      let body = ''

      res.on('data', (data) => { body += data })

      res.on('end', () => {
        try {
          const values = JSON.parse(body).webPages.value
          const results = values.map(({ url, name, snippet }) => ({
            url,
            title: name,
            description: snippet
          }))

          resolve({ results })
        } catch (err) {
          resolve({ results: [] })
        }
      })

      res.on('error', reject)
    }).on('error', reject)
  })
}
