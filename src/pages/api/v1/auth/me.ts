import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "@lib/auth0"

// For more info see: https://github.com/auth0/nextjs-auth0#user-profile
const me = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const { refetch_profile } = req.query
    const refetch = Boolean(refetch_profile)

    await auth0.handleProfile(req, res, {
      refetch,
    })
  } catch (err) {
    res.status(err.status || 500).end(err.message)
  }
}

export default me
