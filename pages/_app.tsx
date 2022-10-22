import '../styles/globals.css'
import 'highlight.js/styles/github-dark.css'
import type { AppProps } from 'next/app'

const CurrentlyFronting = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default CurrentlyFronting
