import Head from 'next/head'
import Title from './Title'

export default (props) => (
  <div>
    <Head>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href='https://fonts.googleapis.com/css?family=Ovo|Muli&subset=latin-ext' rel='stylesheet' />
    </Head>
    <Title />
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html,
      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      button {
        margin: 0;
        padding: 0;
        border: 0;
        font-weight: normal;
      }

      body {
        font-size: 16px;
        font-family: 'Muli', sans-serif;
        line-height: 1.5;
        color: #525252;
        text-rendering: optimizeLegibility;
        background-color: #fff;
      }

      ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #ccc;
      }
      ::-moz-placeholder { /* Firefox 19+ */
        color: #ccc;
      }
      :-ms-input-placeholder { /* IE 10+ */
        color: #ccc;
      }
      :-moz-placeholder { /* Firefox 18- */
        color: #ccc;
      }

      *::selection {
        background: rgba(246, 207, 13, .55);
      }
      *::-moz-selection {
        background: rgba(246, 207, 13, .55);
      }
      *::-webkit-selection {
        background: rgba(246, 207, 13, .55);
      }

      .container {
        padding-right: 10px;
        padding-left: 10px;
        max-width: 600px;
        width: 100%;
      }

      @media all and (min-width: 900px) {
        .container {
          margin-left: 38.5%;
          transform: translateX(-50%);
        }
      }

      img {
        max-width: 100%;
      }

      a {
        color: inherit;
        font-family: inherit;
        text-decoration: none;
      }
    `}</style>
    { props.children }
  </div>
)
