import Link from 'next/link'
import classNames from 'classnames'

export default ({
  result,
  selected,
  onFocus,
  onBlur
}) => {
  return (
    <Link
      href={result.href}
      rel='nofollow noopener'>
      <a onFocus={onFocus} className={classNames('result', { selected })}>
        <style jsx>{`
          .result {
            display: block;
            position: relative;
            margin-bottom: 2.4em;
            padding: 10px;
            cursor: pointer;
            outline: none;
          }

          .result:hover {
            background-color: #f5f5f5;
          }

          .url:hover {
            cursor: inherit;
            color: #f6cf0d;
          }

          .result.selected::before {
            content: '';
            position: absolute;
            left: -1px;
            top: 5%;
            width: 2px;
            height: 90%;
            background-color: #525252;
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
}
