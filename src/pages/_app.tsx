import "@styles/tailwind.css"

import { useEffect } from "react"
import { AppProps } from "next/app"
import { UserProvider } from "@auth0/nextjs-auth0"
import { Theme, themeStorageKey } from "@components/theme-dropdown"

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props

  useEffect(() => {
    const storedAppearance = localStorage.getItem(themeStorageKey)
    if (storedAppearance == Theme.Dark) {
      document.documentElement.classList.add(Theme.Dark)
    } else {
      document.documentElement.classList.remove(Theme.Dark)
    }
  }, [])

  return (
    <UserProvider user={pageProps.user}>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default App
