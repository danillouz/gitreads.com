export interface GitHubCallbackParams {
  code?: string
  installation_id?: string
  setup_action?: string

  // The state parameter is not returned when GitHub initiates the OAuth flow during app installation
  state?: string
}

export interface GitHubInstallationToken {
  installationId: string
  token: string
  createdAt: string
  expiresAt: string
}

export interface GitHubRepository {
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
