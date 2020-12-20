export type Auth0User = {
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

export interface User {
  id: string
  name: string
  username: string | null
  email: string
  emailIsVerified: boolean
  avatar: string | null
  updatedAt: string | null
}

export interface Session {
  user: User | null
  isLoading: boolean
}

export interface UseFetchSessionParams {
  // Force the user to login when there is no session (anymore)
  loginIsRequired?: boolean

  // The path to redirect (back) to after login
  redirectTo?: string
}
