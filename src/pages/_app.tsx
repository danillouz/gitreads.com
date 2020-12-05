import { AppProps } from "next/app"
import Head from "next/head"

import "../styles/tailwind.css"

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <div>
      <Head>
        <title>GitReads</title>

        <meta name="description" content="Track and share what you read." />
        <meta name="theme-color" content="#1e293b" />
        <meta name="msapplication-TileColor" content="#d946ef" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d946ef" />
      </Head>

      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default App
