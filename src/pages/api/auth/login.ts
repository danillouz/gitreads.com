import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "@lib/auth0"

// For more info see: https://github.com/auth0/nextjs-auth0#login
const login = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const { signup } = req.query
    const isSignup = Boolean(signup)

    await auth0.handleLogin(req, res, {
      authParams: {
        // Triggers the signup screen:
        // https://auth0.com/docs/universal-login/new-experience#signup
        screen_hint: isSignup ? "signup" : undefined,
      },
    })
  } catch (err) {
    res.status(err.status || 500).end(err.message)
  }
}

export default login
