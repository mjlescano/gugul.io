import { Component } from 'react'
import ReactDOM from 'react-dom'
import Router from 'next/router'
import search from '../lib/search/client'
import Title from '../components/Title'
import Layout from '../components/Layout'
import Result from '../components/Result'
import SearchInput from '../components/SearchInput'

export default class Page extends Component {
  constructor (props) {
    super(props)

    this.state = {
      query: props.url.query && props.url.query.query,
      results: [],
      error: null
    }
  }

  componentDidMount () {
    this.handleSubmit(this.state.query)
  }

  handleChange = (query) => {
    this.setState({
      query,
      results: [],
      error: null
    })

    Router.push({
      pathname: '/',
      query: query ? { query } : null
    })
  }

  handleSubmit = (query) => {
    search(query)
      .then((results) => {
        this.setState({
          query,
          results,
          error: null
        })
      })
      .catch((err) => {
        if (err.status === 429) {
          return this.setState({
            query,
            results: [],
            error: 'Sorry, Google rate limits private searchs, try again in a moment please.'
          })
        }

        this.setState({
          query,
          results: [],
          error: 'Sorry, there was an error.'
        })
      })
  }

  focusSearch = () => {
    ReactDOM.findDOMNode(this.searchInput).focus()
  }

  render () {
    const { query, results, error } = this.state

    return (
      <Layout>
        <style jsx>{`
          header {
            padding: 20px 0;
            border-bottom: 1px solid #ebebeb;
            background-color: #fafafa;
          }

          header :global(.search-input) {
            display: block;
            cursor: text;
            margin: 0;
            padding: 0;
            border: 0;
            width: 100%;
            line-height: 1.3;
            font-family: 'Playfair Display', serif;
            font-size: 1.8em;
            outline: none;
            color: inherit;
            background-color: transparent;
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
              placeholder='Gugul Search...'
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              value={query}
              autoFocus />
          </div>
        </header>
        <main className='container'>
          {error && (
            <p>{error}</p>
          )}
          {results && results.length > 0 && (
            <div className='results'>
              {results.map((result, i) => {
                if (!result.href) return null
                return (
                  <Result key={i} result={result} />
                )
              })}
            </div>
          )}
        </main>
      </Layout>
    )
  }
}
