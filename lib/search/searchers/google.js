const { promisify } = require('util')
const google = require('google')

google.resultsPerPage = 25

const search = promisify(google.bind(google))

module.exports = {
  maxStack: 4,
  burnInterval: 1000 * 20,
  search: async (query) => {
    const { links } = await search(query)

    const results = links.map((link) => ({
      url: link.href,
      title: link.title,
      description: link.description
    }))

    return { results }
  }
}
