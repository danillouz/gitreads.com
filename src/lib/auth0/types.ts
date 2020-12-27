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
