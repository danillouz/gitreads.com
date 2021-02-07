import { NextApiRequest, NextApiResponse } from "next"

import { newGithubLibraryRoute } from "@config/github"
import { ApiError } from "@lib/api/types"
import auth0 from "@lib/auth0"
import { GitHubCallbackParams } from "@lib/github"
import { connect } from "@lib/mongodb"

const installed = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    // 1. Check if there's a session for the user installing the GitHub app
    const session = await auth0.getSession(req)

    if (!session || !session.user) {
      const err: ApiError = new Error("Unauthorized")
      err.status = 401

      throw err
    }

    // 2. Extract the install ID
    const { installation_id, setup_action }: GitHubCallbackParams = req.query

    if (setup_action !== "install") {
      const err: ApiError = new Error(`Unsupported GitHub app setup action: ${setup_action}`)
      err.status = 409

      throw err
    }

    // 3. Store provider info
    const nowDate = new Date().toISOString()

    const { db } = await connect()
    await db.collection("providers").insertOne({
      userId: session.user.sub,
      type: "GitHub",
      installationId: installation_id,
      createdAt: nowDate,
      updatedAt: nowDate,
    })

    res.writeHead(302, {
      Location: newGithubLibraryRoute,
    })
    res.end()
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message,
      status: err.status,
    })
  }
}

export default installed
