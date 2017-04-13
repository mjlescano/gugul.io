import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

export default () => (
  <div className='loading-result'>
    <style jsx>{`
      .loading-result {
        margin-bottom: 2em;
      }

      h1,
      p {
        word-break: break-all;
        color: #fafafa;
      }

      h1 {
        margin-bottom: .3em;
        line-height: 1.3;
        font-family: 'Playfair Display', serif;
        font-size: 1.8em;
        cursor: default;
      }

      h1 span {
        background-image: -webkit-repeating-linear-gradient(
          top,
          transparent,
          transparent .7em,
          #777 .7em,
          #777 calc(.7em + 1px),
          transparent calc(.7em + 1px),
          transparent calc(.7em * 2 - 2px)
        );
      }

      p {
        font-size: .9em;
      }

      p span {
        background-image: -webkit-repeating-linear-gradient(
          top,
          transparent,
          transparent .7em,
          #999 .7em,
          #999 calc(.7em + 1px),
          transparent calc(.7em + 1px),
          transparent calc(.7em * 2 - 2px)
        );
      }

      // .loading-result :global(.title-enter) {
      //   opacity: 0.01;
      //   background-color: red;
      // }
      //
      // .loading-result :global(.title-enter.title-enter-active) {
      //   opacity: 1;
      //   transition: opacity 1500ms ease-in;
      //   background-color: blue;
      // }
      //
      // .loading-result :global(.title-appear) {
      //   opacity: 0.01;
      //   background-color: cyan;
      // }
      //
      // .loading-result :global(.title-appear.title-appear-active) {
      //   opacity: 1;
      //   transition: opacity 1500ms ease-in;
      //   background-color: salmon;
      // }
    `}</style>
    <CSSTransitionGroup
      transitionName='title'
      transitionEnterTimeout={1500}
      transitionLeaveTimeout={1500}
      transitionAppear
      transitionAppearTimeout={1500}>
      <h1 key='title'><span>{randSpaces(20, 55)}</span></h1>
    </CSSTransitionGroup>
    <p><span>{randSpaces(35, 80)}</span></p>
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
