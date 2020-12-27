import "@styles/global.css"
import "@styles/tailwind.css"
import { AppProps } from "next/app"
import { SessionProvider } from "@lib/auth0"

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props

  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App
