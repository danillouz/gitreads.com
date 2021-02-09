import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"

import auth0 from "@lib/auth0"
import { GitHubProviderMeResponse } from "@lib/api/types"
import { connect } from "@lib/mongodb"
import { getInstallationToken, getInstallationRepos } from "@lib/github"

const githubMe = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const { user } = await auth0.getSession(req, res)

    const { db } = await connect()
    const provider = await db.collection("providers").findOne({
      type: "GitHub",
      userId: user.sub,
    })

    if (!provider) {
      const meResp: GitHubProviderMeResponse = {
        provider: null,
        repos: null,
      }
      return res.json(meResp)
    }

    const { token } = await getInstallationToken(provider.installationId)
    const repos = await getInstallationRepos(token)

    const meResp: GitHubProviderMeResponse = {
      provider: {
        userId: provider.userId,
        type: provider.type,
        installationId: provider.installationId,
        createdAt: provider.createdAt,
        updatedAt: provider.updatedAt,
      },
      repos,
    }
    res.json(meResp)
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message,
      status: err.status,
    })
  }
}

export default withApiAuthRequired(githubMe)
