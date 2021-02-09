import { NextApiRequest, NextApiResponse } from "next"

import auth0 from "@lib/auth0"

const login = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const returnTo = String(req.query.redirectTo) || ""
    await auth0.handleLogin(req, res, { returnTo })
  } catch (err) {
    res.status(err.status || 500).end(err.message)
  }
}

export default login
