import { UserProfile } from "@auth0/nextjs-auth0"

export interface Session {
  user: UserProfile | null
  isLoading: boolean
}
