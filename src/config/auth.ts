export const authApi = "/api/auth"
export const appRoute = "/app"
export const loginUrl = `${authApi}/login?redirectTo=${encodeURIComponent(appRoute)}`
export const signupUrl = `${authApi}/login?signup=true&redirectTo=${encodeURIComponent(appRoute)}`
export const logoutUrl = `${authApi}/logout`
