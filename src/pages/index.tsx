import Link from "next/link"
import { UseFetchSessionParams, useFetchSession } from "@lib/auth0"

export const Home = (): JSX.Element => {
  const params: UseFetchSessionParams = {
    loginIsRequired: false,
  }
  const { user, isLoading } = useFetchSession(params)

  if (isLoading) {
    return <p>Loading..</p>
  }

  if (!user) {
    return (
      <>
        <p>You are not logged in.</p>
        <Link href="/api/auth/login">
          <a>Login</a>
        </Link>{" "}
        <Link href="/api/auth/login?signup=true">
          <a>Signup</a>
        </Link>
      </>
    )
  }

  return (
    <>
      <p>Welcome back {user.name}</p>

      <Link href="/api/auth/logout">
        <a>Logout</a>
      </Link>
    </>
  )
}

export default Home
