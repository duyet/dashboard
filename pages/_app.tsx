import type { AppProps } from 'next/app'

import '../styles/globals.css'
import '@tremor/react/dist/esm/tremor.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
