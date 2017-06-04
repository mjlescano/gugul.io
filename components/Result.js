import Link from 'next/link'

export default ({ result, key }) => (
  <div className='result'>
    <style jsx>{`
      .result {
        margin-bottom: 2em;
      }

      h1 {
        margin-bottom: .3em;
        line-height: 1.3;
        font-family: 'Ovo', serif;
        font-size: 1.4em;
        cursor: default;
      }

      a {
        cursor: pointer;
      }

      p {
        font-size: .9em;
        hyphens: auto;
      }
    `}</style>
    <h1>
      <Link
        href={result.href}
        rel='nofollow noopener'>
        <a>{result.title}</a>
      </Link>
    </h1>
    <p>{result.description || result.href}</p>
  </div>
)
