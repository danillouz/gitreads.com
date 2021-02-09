import { initAuth0 } from "@auth0/nextjs-auth0"

export default initAuth0({
  enableTelemetry: false,
  secret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  routes: {
    callback: process.env.AUTH0_CALLBACK,
    postLogoutRedirect: process.env.AUTH0_POST_LOGOUT_REDIRECT,
  },
  authorizationParams: {
    scope: process.env.AUTH0_SCOPE,
  },
})

export * from "./types"
export * from "./session"
