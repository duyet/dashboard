import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'
import '@tremor/react/dist/esm/tremor.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="bg-slate-50 p-6 sm:p-10">
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
