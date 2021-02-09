import "@styles/global.css"
import "@styles/tailwind.css"
import { AppProps } from "next/app"
import { UserProvider } from "@auth0/nextjs-auth0"

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props

  return (
    <UserProvider user={pageProps.user}>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default App
