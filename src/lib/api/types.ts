export interface ApiError extends Error {
  status?: number
}

export interface GitHubProvider {
  userId: string
  type: "GitHub"
  installationId: string
  createdAt: string
  updatedAt: string
}

export interface GitHubRepo {
  id: string
  name: string
  description: string
  url: string
  apiUrl: string
  isPrivate: boolean
  owner: {
    id: string
    username: string
    avatar: string
    url: string
    apiUrl: string
  }
}

export interface GitHubProviderMeResponse {
  provider: null | GitHubProvider
  repos: null | GitHubRepo[]
}
