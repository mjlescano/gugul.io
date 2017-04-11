import Head from 'next/head'

export default ({ children }) => (
  <Head>
    <title>{children && `${children} | `}Gugul Search</title>
  </Head>
)
