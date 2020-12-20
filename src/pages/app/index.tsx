import Link from "next/link"
import { useRouter } from "next/router"
import { UseFetchSessionParams, useFetchSession } from "@lib/auth0"
import Page from "@components/page"

export const App = (): JSX.Element => {
  const router = useRouter()

  const params: UseFetchSessionParams = {
    loginIsRequired: true,
    redirectTo: router.pathname,
  }
  const { user, isLoading } = useFetchSession(params)

  if (isLoading) {
    return <p>Loading app..</p>
  }

  return (
    <Page title="GitReads - App">
      <h1>App</h1>
      <p>Welcome back {user.name}</p>
      <Link href="/">
        <a>Home</a>
      </Link>{" "}
      <Link href="/api/auth/logout">
        <a>Logout</a>
      </Link>
    </Page>
  )
}

export default App
