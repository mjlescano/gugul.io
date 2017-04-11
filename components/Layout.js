import Head from 'next/head'
import Title from './Title'

export default (props) => (
  <div>
    <Head>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Title />
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=Playfair+Display|Raleway&subset=latin-ext');

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
        font-family: 'Raleway', sans-serif;
        line-height: 1.5;
        color: #525252;
        text-rendering: optimizeLegibility;
        backgorund-color: #fff;
      }

      .container {
        padding-right: 20px;
        padding-left: 20px;
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

      a:hover,
      a.active {
        color: #f6cf0d;
      }
    `}</style>
    { props.children }
  </div>
)
