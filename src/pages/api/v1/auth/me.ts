import { NextApiRequest, NextApiResponse } from "next"

import auth0 from "@lib/auth0"

const me = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await auth0.handleProfile(req, res)
  } catch (err) {
    res.status(err.status || 500).end(err.message)
  }
}

export default me
