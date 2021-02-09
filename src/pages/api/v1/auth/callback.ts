import { NextApiRequest, NextApiResponse } from "next"

import auth0 from "@lib/auth0"

const callback = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await auth0.handleCallback(req, res)
  } catch (err) {
    res.status(err.status || 500).end(err.message)
  }
}

export default callback
