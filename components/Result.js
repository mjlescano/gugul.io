import Link from 'next/link'
import classNames from 'classnames'

export default ({
  index,
  result,
  selected,
  onFocus,
  onUrlClick
}) => (
  <Link href={result.href}>
    <a
      id={`result-${index}`}
      onFocus={onFocus}
      className={classNames('result', { selected })}
      rel='noopener nofollow'>
      <style jsx>{`
        .result {
          display: block;
          position: relative;
          margin-bottom: 2.4em;
          padding: 10px;
          cursor: pointer;
          outline: none;
          transition: background-color .1s ease-in-out;
        }

        .result:hover,
        .result.selected {
          background-color: #f5f5f5;
        }

        .result.selected::before {
          opacity: 1;
        }

        .result::before {
          content: '';
          position: absolute;
          left: -1px;
          top: 0;
          width: 2px;
          height: 100%;
          background-color: #525252;
          opacity: 0;
          transition: opacity .1s ease-in-out;
        }

        h1 {
          margin-bottom: .1em;
          line-height: 1.2;
          font-family: 'Ovo', serif;
          font-size: 1.4em;
        }

        .desc {
          font-size: .8em;
          hyphens: auto;
        }

        .url {
          display: inline-block;
          font-size: .75em;
          color: #aaa;
          word-break: break-all;
        }

        .url span {
          display: inline-block;
          position: relative;
          top: .1em;
          padding-right: .4em;
        }

        .url svg path {
          fill: #aaa;
        }

        .url:hover {
          cursor: inherit;
          color: #f6cf0d;
        }

        .url:hover svg path {
          fill: #f6cf0d;
        }
      `}</style>
      <h1>{result.title}</h1>
      <p className='desc'>{result.description || result.href}</p>
      <div className='url' onClick={onUrlClick}>
        <span>
          <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'>
            <path d='M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z' />
          </svg>
        </span>
        {result.link}
      </div>
    </a>
  </Link>
)
