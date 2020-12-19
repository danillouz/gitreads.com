import { initAuth0 } from "@auth0/nextjs-auth0"

// For more info see: https://github.com/auth0/nextjs-auth0#runtime-configuration
export default initAuth0({
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: process.env.AUTH0_SCOPE,
  domain: process.env.AUTH0_DOMAIN,
  redirectUri: process.env.AUTH0_REDIRECT_URI,
  postLogoutRedirectUri: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: process.env.AUTH0_SESSION_COOKIE_SECRET,
    cookieLifetime: Number(process.env.AUTH0_SESSION_COOKIE_LIFETIME),
  },
})

export * from "./types"
export * from "./session"
