import { createContext, useContext, useState, useEffect, ReactElement } from "react"
import { useRouter } from "next/router"
import { User, Session } from "./types"

// Use a global to "cache" the session's user data, to prevent refetching after page navigations
let globalUser: User = null

type Auth0User = {
  sub: string | null
  name: string
  nickname: string | null
  email: string
  email_verified: boolean
  picture: string | null
  updated_at: string | null

  // Any custom OIDC claim that could be in the user's profile
  [key: string]: unknown
}

const fetchUser = async (): Promise<User> => {
  if (globalUser) {
    return globalUser
  }

  const res = await fetch("/api/auth/me")
  if (!res.ok) {
    globalUser = null
    return globalUser
  }

  const user: Auth0User = await res.json()
  globalUser = {
    id: user.sub,
    name: user.name,
    username: user.nickname,
    email: user.email,
    emailIsVerified: user.email_verified,
    avatar: user.picture,
    updatedAt: user.updated_at,
  }
  return globalUser
}

const SessionContext = createContext<Session>({
  user: globalUser,
  isLoading: true,
})

type SessionProviderProps = {
  children: React.ReactNode
}

export const SessionProvider = (props: SessionProviderProps): ReactElement<Session> => {
  const [isLoading, setIsLoading] = useState<boolean>(!globalUser)
  const [user, setUser] = useState<User | null>(globalUser)

  useEffect(() => {
    if (globalUser) {
      return
    }

    setIsLoading(true)

    let isMounted = true

    fetchUser().then((user) => {
      // Since we fetch the user data async, only set state when the component is still mounted
      if (!isMounted) {
        return
      }

      setUser(user)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [globalUser])

  const session: Session = {
    isLoading,
    user,
  }

  return <SessionContext.Provider value={session}>{props.children}</SessionContext.Provider>
}

export const useSession = (): Session => {
  const ctx = useContext(SessionContext)
  if (!ctx) {
    throw new Error(
      "useSession() hook can only be used in components wrapped by <SessionProvider />"
    )
  }

  return ctx
}

export const useLoginIsRequired = (session: Session): void => {
  const { user, isLoading } = session

  const router = useRouter()

  useEffect(() => {
    const hasSession = Boolean(user)
    if (hasSession) {
      return
    }

    const loginIsRequired = !user && !isLoading
    if (loginIsRequired) {
      router.push({
        pathname: "/api/auth/login",
        query: {
          // When a user navigates to a page that requires them to be logged in, but there's no
          // session (anymore), make sure to redirect them back to said page after they logged in
          // again
          redirectTo: router.pathname,
        },
      })
      return
    }
  }, [user, isLoading])
}
