export default () => (
  <div className='loading-result'>
    <style jsx>{`
      .loading-result {
        margin-bottom: 2em;
      }

      h1,
      p {
        text-decoration: line-through;
        word-break: break-all;
        color: #777;
      }

      h1 {
        margin-bottom: .3em;
        line-height: 1.3;
        font-family: 'Playfair Display', serif;
        font-size: 1.8em;
        cursor: default;
      }

      p {
        font-size: .9em;
      }
    `}</style>
    <h1>{randSpaces(20, 55)}</h1>
    <p>{randSpaces(35, 80)}</p>
  </div>
)

function randSpaces (min, max) {
  const amount = rand(min, max)
  let str = ''
  for (let i = 0; i < amount; i++) str += '\u2002'
  return str
}

function rand (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
