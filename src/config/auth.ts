export const authApiV1 = "/api/v1/auth"
export const dashboardRoute = "/dashboard"
export const loginUrl = `${authApiV1}/login?redirectTo=${encodeURIComponent(dashboardRoute)}`
export const signupUrl = `${authApiV1}/login?signup=true&redirectTo=${encodeURIComponent(
  dashboardRoute
)}`
export const logoutUrl = `${authApiV1}/logout`
