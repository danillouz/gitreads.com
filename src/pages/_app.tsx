import { AppProps } from "next/app"
import "@styles/tailwind.css"

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  return <Component {...pageProps} />
}

export default App
