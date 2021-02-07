import { githubApi } from "@config/github"
import { GitHubRepository } from "./types"

type ErrorResponse = {
  message: string
  documentation_url: string
}

type RepositoriesResponse = {
  total_count: number
  repositories: Array<{
    id: number
    name: string
    full_name: string
    description: string
    private: boolean
    url: string
    html_url: string
    visibility: string
    archived: boolean
    disabled: boolean
    fork: boolean
    pushed_at: string
    created_at: string
    updated_at: string
    owner: {
      id: number
      type: string
      login: string
      avatar_url: string
      url: string
      html_url: string
    }
  }>
}

// Get all repositories that an app installation can access.
//
// We need the app's installation token to make the request.
//
// For more info see: https://docs.github.com/en/free-pro-team@latest/rest/reference/apps#list-repositories-accessible-to-the-app-installation
export const getInstallationRepos = async (
  installationToken: string
): Promise<GitHubRepository[]> => {
  const res = await fetch(`${githubApi}/installation/repositories`, {
    headers: {
      Authorization: `token ${installationToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  })

  const jsonPromise = res.json()

  if (!res.ok) {
    const reposRes: ErrorResponse = await jsonPromise
    throw new Error(reposRes.message)
  }

  const reposRes: RepositoriesResponse = await jsonPromise
  const repos: GitHubRepository[] = reposRes.repositories?.map((r) => {
    return {
      id: String(r.id),
      name: r.name,
      description: r.description,
      url: r.html_url,
      apiUrl: r.url,
      isPrivate: r.private,
      owner: {
        id: String(r.owner?.id),
        username: r.owner?.login,
        avatar: r.owner?.avatar_url,
        url: r.owner?.html_url,
        apiUrl: r.owner?.url,
      },
    }
  })

  return repos
}
