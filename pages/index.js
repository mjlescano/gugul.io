import { Component } from 'react'
import ReactDOM from 'react-dom'
import Router from 'next/router'
import debounce from 'lodash.debounce'
import times from 'lodash.times'
import Mousetrap from 'mousetrap'
import jump from 'jump.js'
import search from '../lib/search/client'
import Title from '../components/Title'
import Layout from '../components/Layout'
import Result from '../components/Result'
import SearchInput from '../components/SearchInput'
import LoadingResult from '../components/LoadingResult'

const handledKeys = [
  'alt',
  'ctrl',
  'down',
  'enter',
  'meta',
  'tab',
  'up'
]

const openLink = (url, newWindow = false) => {
  if (newWindow) {
    window.open(url, '_blank').focus()
  } else {
    window.location = url
  }
}

export default class Page extends Component {
  static async getInitialProps (ctx) {
    const { query } = ctx.query

    const props = {
      results: [],
      query
    }

    try {
      props.results = await search(query)
    } catch (err) {
      console.error(err)
    }

    return props
  }

  constructor (props) {
    super(props)

    const { query = '', results = [] } = props

    this.state = {
      query,
      results,
      selected: results.length === 0 ? -1 : 0,
      error: null,
      loading: false
    }

    this.lazyLoading = debounce(this.loading, 400)
    this.lazySearch = debounce(this.search, 900)
  }

  componentDidMount () {
    this.mousetrap = new Mousetrap(window.document)

    const handleKey = this.mousetrap.handleKey.bind(this.mousetrap)
    this.mousetrap.handleKey = (char, mods, evt) => {
      const key = char.trim()
      if (!key) return
      handleKey(key, mods, evt)
      if (handledKeys.includes(key)) return
      this.selectSearch(this.state.query.length)
    }

    this.mousetrap.bind('down', this.selectNextResult)
    this.mousetrap.bind('up', this.selectPrevResult)
  }

  // Dont re-render new loading list
  shouldComponentUpdate (nextProps, nextState) {
    const results = this.state.results
    const nextResults = nextState.results

    if (this.state.loading === false) return true
    if (nextState.loading === false) return true
    if (results.length !== 0) return true
    if (!nextResults || nextResults.length === 0) return false

    return true
  }

  handleChange = (query) => {
    this.setState({
      query,
      results: [],
      selected: -1,
      error: null,
      loading: false
    }, () => {
      this.lazyLoading()
      this.lazySearch()
    })

    const href = '/' + (query ? `?query=${query}` : '')
    Router.push(href, href, { shallow: true })
  }

  handleSubmit = (query) => {
    this.setState({ query }, this.search)
  }

  loading = () => {
    this.setState({
      loading: !!this.state.query
    })
  }

  _search = null
  search = () => {
    const query = this.state.query

    this.setState({ loading: true })

    if (this._search) this._search.abort()

    const _search = this._search = search(query)

    _search.aborted = false

    _search.abort = () => {
      _search.aborted = true
    }

    _search
      .then((results) => {
        if (_search.aborted) return

        this.setState({
          query,
          results,
          selected: results.length === 0 ? -1 : 0,
          error: null,
          loading: false
        })
      })
      .catch((err) => {
        if (_search.aborted) return

        let msg = 'Sorry, there was an error.'

        if (err.status === 429) {
          msg = 'Sorry, the server reach the limit of maximum calls, try again in a moment please.'
        }

        this.setState({
          query,
          results: [],
          selected: -1,
          loading: false,
          error: msg
        })
      })
  }

  selectSearch = (selectionStart = 0) => {
    this.setState({ selected: -1 }, () => {
      jump('header', {
        duration: 200,
        callback: () => {
          const input = ReactDOM.findDOMNode(this.searchInput)

          if (document.activeElement !== input) {
            input.focus()
            input.selectionStart = selectionStart
            input.selectionEnd = this.state.query.length
          }
        }
      })
    })
  }

  focusSearch = () => {
    this.selectSearch(0)
  }

  blurSearch = () => {
    ReactDOM.findDOMNode(this.searchInput).blur()
  }

  selectResult = (selected) => {
    this.setState({ selected }, this.scrollToSelectedResult)
  }

  focusResult = (index) => {
    if (this.state.selected === index) return

    const searchInput = ReactDOM.findDOMNode(this.searchInput)

    if (document.activeElement === searchInput) {
      this.selectResult(index)
    } else {
      const result = document.getElementById(`result-${index}`)

      if (result) {
        result.focus()
      } else {
        this.selectResult(index)
      }
    }
  }

  scrollToSelectedResult = () => {
    const el = document.querySelector('.result.selected')

    if (!el) return

    const rect = el.getBoundingClientRect()
    const h = window.innerHeight || document.documentElement.clientHeight

    const isAfterTop = rect.top >= 0
    const isBeforeBottom = rect.bottom - h <= 0

    // Element is fully visible
    if (isAfterTop && isBeforeBottom) return

    const offset = isAfterTop ? (rect.height + marginBottom(el)) - h : 0

    jump(el, {
      duration: 200,
      offset
    })
  }

  selectNextResult = (evt) => {
    const count = this.state.results.length
    let { selected } = this.state

    if (count <= 0) return
    if (++selected >= count) return

    evt.preventDefault()

    this.focusResult(selected)
  }

  selectPrevResult = (evt) => {
    const count = this.state.results.length
    let { selected } = this.state

    if (count <= 0) return
    if (--selected < 0) return this.focusSearch()

    evt.preventDefault()

    this.focusResult(selected)
  }

  openResult = (evt) => {
    const { results, selected } = this.state

    if (selected === -1) {
      if (results.length > 0) this.focusResult(0)
      return
    }

    const result = results[selected]

    openLink(result.url, evt.ctrlKey || evt.metaKey)
  }

  handleInputKeyDown = (evt) => {
    if (evt.key === 'ArrowUp') {
      this.blurSearch()
      return this.selectPrevResult(evt)
    }

    if (evt.key === 'ArrowDown') {
      this.blurSearch()
      return this.selectNextResult(evt)
    }

    if (evt.key === 'Enter') {
      this.blurSearch()
      return this.openResult(evt)
    }
  }

  handleUrlClick = (evt, url) => {
    evt.preventDefault()
    openLink(url, true)
  }

  render () {
    const {
      query,
      results,
      selected,
      error,
      loading
    } = this.state

    return (
      <Layout>
        <style jsx>{`
          header {
            padding: 2em 0 1em;
          }

          header :global(.search-input) {
            display: block;
            cursor: text;
            margin: 0;
            padding: 0 10px;
            border: 0;
            width: 100%;
            line-height: 1.3;
            font-family: 'Ovo', serif;
            font-size: 1.8em;
            outline: none;
            color: inherit;
            background-color: transparent;
          }

          .search-error {
            margin: 1em 0;
            font-weight: 700;
          }

          .results {
            padding-top: 2em;
          }
        `}</style>
        <Title>{query}</Title>
        <header onClick={this.focusSearch}>
          <div className='container'>
            <SearchInput
              ref={(input) => { this.searchInput = input }}
              className='search-input'
              placeholder='Type your search…'
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              onKeyDown={this.handleInputKeyDown}
              value={query}
              autoFocus />
          </div>
        </header>
        <main className='container'>
          {error && (
            <div className='search-error'>
              {error}
            </div>
          )}
          <div className='results'>
            {!loading && results.map((result, index) => {
              return (
                <Result
                  key={index}
                  index={index}
                  selected={selected === index}
                  result={result}
                  onFocus={() => this.selectResult(index)}
                  onUrlClick={(evt) => this.handleUrlClick(evt, result.url)} />
              )
            })}
            {loading && times(10, (i) => <LoadingResult key={i} />)}
          </div>
        </main>
      </Layout>
    )
  }
}

function marginBottom (el) {
  const marginBottom = document.defaultView
    .getComputedStyle(el)
    .getPropertyValue('margin-bottom')

  return parsePixels(marginBottom)
}

function parsePixels (pxs) {
  return Number(pxs.replace('px', ''))
}
