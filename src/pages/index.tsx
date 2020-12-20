import Link from "next/link"
import { UseFetchSessionParams, useFetchSession } from "@lib/auth0"
import Page from "@components/page"

export const Home = (): JSX.Element => {
  const params: UseFetchSessionParams = {
    loginIsRequired: false,
  }
  const { user, isLoading } = useFetchSession(params)

  if (isLoading) {
    return <p>Loading..</p>
  }

  return (
    <Page>
      <h1>Website</h1>
      {user ? <p>Welcome back {user.name}</p> : <p>You are not logged in.</p>}

      {user ? (
        <>
          <Link href="/app">
            <a>App</a>
          </Link>{" "}
          <Link href="/api/auth/logout">
            <a>Logout</a>
          </Link>
        </>
      ) : (
        <>
          <Link href="/api/auth/login">
            <a>Login</a>
          </Link>{" "}
          <Link href="/api/auth/login?signup=true">
            <a>Signup</a>
          </Link>
        </>
      )}
    </Page>
  )
}

export default Home
