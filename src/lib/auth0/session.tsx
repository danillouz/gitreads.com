import { useState, useEffect } from "react"
import { Auth0User, User, Session, UseFetchSessionParams } from "./types"

// Use a global to "cache" the session's user data, to prevent refetching after page navigations
let globalUser: User = null

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

export const useFetchSession = (params: UseFetchSessionParams): Session => {
  const { loginIsRequired = true } = params

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

      if (!user && loginIsRequired) {
        return (window.location.href = "/api/auth/login")
      }

      setUser(user)
      setIsLoading(false)
    })

    return () => (isMounted = false)
  }, [globalUser])

  return {
    isLoading,
    user,
  }
}
