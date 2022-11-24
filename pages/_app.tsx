import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <title>Random Jokes Generator</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
