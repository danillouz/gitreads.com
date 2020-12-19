import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "@lib/auth0"

// For more info see: https://github.com/auth0/nextjs-auth0#login
const callback = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await auth0.handleCallback(req, res, {
      // Control the callback to, for example, modify the session or do some authorization checks
      // For more info see: https://github.com/auth0/nextjs-auth0#controlling-the-callback
      //
      // onUserLoaded: async (req, res, session, state) => {
      //   return session
      // },
    })
  } catch (err) {
    console.error("auth callback failed: ", err)

    res.status(err.status || 500).end(err.message)
  }
}

export default callback
