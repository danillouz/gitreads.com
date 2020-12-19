import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "@lib/auth0"

// For more info see: https://github.com/auth0/nextjs-auth0#logout
const logout = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await auth0.handleLogout(req, res)
  } catch (err) {
    console.error("logout failed: ", err)

    res.status(err.status || 500).end(err.message)
  }
}

export default logout
