import Link from 'next/link'
import classNames from 'classnames'

export default ({
  result,
  selected,
  onFocus,
  onBlur
}) => (
  <Link
    href={result.href}
    rel='noopener noreferrer'>
    <a onFocus={onFocus} className={classNames('result', { selected })}>
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

        .url:hover {
          cursor: inherit;
          color: #f6cf0d;
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
      `}</style>
      <h1>{result.title}</h1>
      <p className='desc'>{result.description || result.href}</p>
      <div className='url'>{result.link}</div>
    </a>
  </Link>
)
