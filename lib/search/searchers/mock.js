const PER_PAGE = 25

const MOCKS = [
  {
    url: 'https://es.wikipedia.org/wiki/Nikola_Tesla',
    title: 'The 10 Inventions Of Nikola Tesla That Changed The World',
    description: 'The inventions of Nikola Tesla are some of the most fundamental to our world today. Imagine what was suppressed by corporate-government collusion.'
  },
  {
    url: 'http://www.ebay.com/sch/items/?_nkw=zebra+sarasa&_sacat=&_ex_kw=&_mPrRngCbx=1&_udlo=&_udhi=&_sop=12&_fpos=&_fspt=1&_sadis=&LH_CAds=&rmvSB=true',
    title: '8 Things You Didn\'t Know About Nikola Tesla | PBS NewsHour',
    description: 'Futurist Nikola Tesla, seen here at age 34 in 1890, is the inventor of the Tesla coil and alternating current machinery. Photo courtesy Wikimedia Commons.'
  },
  {
    url: 'https://en.wikipedia.org/wiki/Randomness',
    title: 'Randomness',
    description: 'Randomness is the lack of pattern or predictability in events. A random sequence of events, symbols or steps has no order and does not follow an intelligible pattern or combination. Individual random events are by definition unpredictable, but in many cases the frequency of different outcomes over a large number of events is predictable.'
  }
]

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

module.exports = {
  maxStack: 10,
  burnInterval: 100,
  search: () => {
    const results = Array.from(Array(PER_PAGE))
      .map(() => MOCKS[rand(0, MOCKS.length - 1)])

    return new Promise((resolve) => {
      setTimeout(() => resolve({ results }), rand(200, 1500))
    })
  }
}
