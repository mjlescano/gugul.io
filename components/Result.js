import Link from 'next/link'

export default ({ result, key }) => (
  <div className='result'>
    <style jsx>{`
      .result {
        margin-bottom: 2.4em;
      }

      h1 {
        margin-bottom: .1em;
        line-height: 1.2;
        font-family: 'Ovo', serif;
        font-size: 1.4em;
        cursor: default;
      }

      a {
        cursor: pointer;
      }

      .desc {
        font-size: .9em;
        hyphens: auto;
      }

      .url {
        font-size: .75em;
        color: #aaa;
      }

      .url:hover {
        color: #f6cf0d;
      }
    `}</style>
    <h1>
      <Link
        href={result.href}
        rel='nofollow noopener'>
        <a>{result.title}</a>
      </Link>
    </h1>
    <p className='desc'>{result.description || result.href}</p>
    <Link
      href={result.href}
      rel='nofollow noopener'>
      <a className='url'>{result.link}</a>
    </Link>
  </div>
)
