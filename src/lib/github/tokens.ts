import jwt from "jsonwebtoken"
// import fetch from "isomorphic-unfetch"

import { githubApi } from "@config/github"
import { GitHubInstallationToken } from "./types"

const { GH_APP_ID, GH_APP_PRIVATE_KEY } = process.env

type AppToken = {
  appId: string
  token: string
  createdAt: string
  expiresAt: string
}

let globalAppTokenData: AppToken | null = null
let globalInstallationTokenData: GitHubInstallationToken | null = null

type JwtPayload = {
  // The token's "issued at time" in seconds
  iat: number

  // The token's expiration time in seconds
  exp: number

  // The token's issuer (Github App ID)
  iss: string
}

// Get an app token to authenticate as a GitHub App.
//
// This app token allows us to interact with the Apps API endpoint: https://docs.github.com/en/rest/reference/apps
//
// A JWT is returned (valid for 10 minutes), which should be set as a "Bearer token" in the
// Authorization header when making authenticated requests to the GitHub API:
//
// HTTP GET https://api.github.com/app
//  Authorization: Bearer YOUR_JWT
//  Accept: application/vnd.github.v3+json
//
// For more info see: https://docs.github.com/en/free-pro-team@latest/developers/apps/authenticating-with-github-apps#authenticating-as-a-github-app
const getAppToken = async (): Promise<AppToken> => {
  const now = Date.now()
  const nowSec = Math.floor(now / 1e3)

  // 10 minutes (this is the GitHub maximum)
  const expirationSec = nowSec + 10 * 60

  const payload: JwtPayload = {
    iat: nowSec,
    exp: expirationSec,
    iss: GH_APP_ID,
  }

  const options = {
    algorithm: "RS256",
  }

  // For more info see: https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
  const token = jwt.sign(payload, GH_APP_PRIVATE_KEY, options)

  return {
    appId: GH_APP_ID,
    token,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(expirationSec * 1e3).toISOString(),
  }
}

type ErrorResponse = {
  message: string
  documentation_url: string
}

type TokenDataResponse = {
  token: string
  expires_at: string
  permissions: Record<string, unknown>
  repository_selection: "all" | "selected"
}

// Get an installation token to authenticate as an App installation.
//
// This installation token allows us to interact with the following API endpoints: https://docs.github.com/en/rest/overview/endpoints-available-for-github-apps
//
// A token is returned (valid for 1 hour), which should be set as the Authorization header when
// making authenticated requests to the GitHub API:
//
// HTTP GET https://api.github.com/installation/repositories
//  Authorization: token YOUR_INSTALLATION_TOKEN
//  Accept: application/vnd.github.v3+json
//
// For more info see: https://docs.github.com/en/free-pro-team@latest/developers/apps/authenticating-with-github-apps#authenticating-as-an-installation
export const getInstallationToken = async (
  installationId: string
): Promise<GitHubInstallationToken> => {
  const now = Date.now()

  let jwtToken = null

  // 1. To get an installation token we first need an app token (JWT)
  // So first check if we already have a "cached" value
  // If not we get a new one, which is valid for 10 minutes
  if (!globalAppTokenData) {
    const appTokenData = await getAppToken()
    globalAppTokenData = appTokenData
    jwtToken = globalAppTokenData.token
  }

  // 2. If we did have a "cached" app token (JWT), we need to check if it's still valid
  const appTokenIsExpired = now >= new Date(globalAppTokenData.expiresAt).getTime()
  if (appTokenIsExpired) {
    const appTokenData = await getAppToken()
    globalAppTokenData = appTokenData
    jwtToken = globalAppTokenData.token
  }

  // 3. Now we hav a valid app token (JWT) we can fetch the installation token
  // First we check if we already have a "cached" installation token, that's still valid
  if (globalInstallationTokenData) {
    const installationTokenIsExpired =
      now >= new Date(globalInstallationTokenData.expiresAt).getTime()

    if (!installationTokenIsExpired) {
      return globalInstallationTokenData
    }
  }

  // 4. Since we don't have valid installation token (anymore), we fetch a new one
  //
  // For more info see: https://docs.github.com/en/free-pro-team@latest/rest/reference/apps#create-an-installation-access-token-for-an-app
  const res = await fetch(`${githubApi}/app/installations/${installationId}/access_tokens`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  })

  const jsonPromise = res.json()

  if (!res.ok) {
    const tokenRes: ErrorResponse = await jsonPromise
    throw new Error(tokenRes.message)
  }

  const tokenRes: TokenDataResponse = await jsonPromise
  const installationTokenData: GitHubInstallationToken = {
    installationId,
    token: tokenRes.token,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(tokenRes.expires_at).toISOString(),
  }

  globalInstallationTokenData = installationTokenData

  return installationTokenData
}
