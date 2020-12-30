export const authApiV1 = "/api/v1/auth"
export const appRoute = "/app"
export const loginUrl = `${authApiV1}/login?redirectTo=${encodeURIComponent(appRoute)}`
export const signupUrl = `${authApiV1}/login?signup=true&redirectTo=${encodeURIComponent(appRoute)}`
export const logoutUrl = `${authApiV1}/logout`
