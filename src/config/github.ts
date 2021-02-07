export const githubApi = "https://api.github.com"
export const githubDomain = "https://github.com"
export const appSlug = process.env.NODE_ENV === "production" ? "gitreads" : "gitreads-dev"
export const appName = "GitReads"
export const appPageLink = `${githubDomain}/apps/${appSlug}`
export const appInstallLink = `${githubDomain}/apps/${appSlug}/installations/new`
export const appSettingsLink = `${githubDomain}/settings/installations`
export const newRepoLink = `${githubDomain}/gitreads/gitreads-db/generate`
export const newGithubLibraryRoute = "/dashboard/libraries/new/github"
