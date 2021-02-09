import { useEffect } from "react"
import { useRouter } from "next/router"
import { authApiV1 } from "@config/auth"

import { Session } from "./types"

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
        pathname: `${authApiV1}/login`,
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
