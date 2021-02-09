import { useEffect, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0"
import Link from "next/link"

import {
  appName,
  appPageLink,
  appInstallLink,
  appSettingsLink,
  newRepoLink,
  githubDomain,
} from "@config/github"

import { githubMeEndpoint } from "@config/providers"
import { GitHubProviderMeResponse, GitHubProvider, GitHubRepo } from "@lib/api/types"
import { AppShell } from "@components/shell"

import {
  ContentContainer,
  ContentHeader,
  ContenteSection,
  ContentSectionTitle,
} from "@components/content"

import { List, ListItem } from "@components/list"
import { InfoIcon, GitHubIcon } from "@components/icons"
import { formatDate } from "@utils/format-date"

type AppInstallProps = {
  appPageLink: string
  newRepoLink: string
  appInstallLink: string
}

const AppInstall = (props: AppInstallProps): JSX.Element => {
  return (
    <div className="border border-gray-600 rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-5 sm:px-6 text-lg text-gray-300 antialiased">
        <p>
          In order for us to access- and interact with your repositories, you&apos;ll need to
          install{" "}
          <a
            className="underline focus:outline-white"
            href={props.appPageLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            our GitHub App
          </a>
          .
        </p>

        <p className="mt-4 pt-4 mb-2 border-t border-gray-700">
          By clicking the install button below, the following will happen:
        </p>

        <ol className="list-decimal ml-8">
          <li className="mt-2">We&apos;ll redirect you to GitHub.</li>

          <li className="mt-2">
            GitHub will ask you on which account you&apos;d like to install our App.{" "}
            <b>Choose your personal account.</b>
          </li>

          <li className="mt-2">
            Then GitHub will ask you to give access to your repositories.{" "}
            <b>We do not need access to all your repositories</b>. You can{" "}
            <a
              className="underline focus:outline-white"
              href={props.newRepoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              create a new public repository
            </a>{" "}
            on your personal account, and only give us access to that one.
          </li>

          <li className="mt-2">After you click install, GitHub will redirect you back here.</li>
        </ol>

        <div className="mt-8">
          <a
            className="w-full sm:w-auto text-white rounded-lg shadow-md btn sm:btn-lg bg-purple-500 hover:bg-purple-400 focus:ring-white"
            href={props.appInstallLink}
          >
            Got it, install App
          </a>
        </div>
      </div>
    </div>
  )
}

const AppInfoLoading = (): JSX.Element => {
  return (
    <div className="border border-gray-600 rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-5 sm:px-6 animate-pulse">
        <div className="w-60 h-7 bg-gray-400 rounded" />
        <div className="w-40 h-5 mt-1 bg-gray-400 rounded" />
      </div>

      <dl className="border-t border-b border-gray-600">
        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 animate-pulse">
          <div className="w-28 h-6 bg-gray-400 rounded" />
          <div className="w-36 h-6 mt-1 sm:mt-0 sm:col-span-2 bg-gray-400 rounded" />
        </div>

        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 animate-pulse">
          <div className="w-24 h-6 bg-gray-400 rounded" />
          <div className="w-40 h-6 mt-1 sm:mt-0 sm:col-span-2 bg-gray-400 rounded" />
        </div>
      </dl>

      <div className="px-4 py-5 sm:px-6 animate-pulse">
        <div className="w-full h-5 sm:h-6 bg-gray-400 rounded" />
      </div>
    </div>
  )
}

type AppInfoProps = {
  appName: string
  appPageLink: string
  appSettingsLink: string
  appInstallLink: string
  installationId: string
  createdAt: string
  className?: string
}

const AppInfo = (props: AppInfoProps): JSX.Element => {
  return (
    <div className="border border-gray-600 rounded-lg shadow-sm overflow-hidden transition duration-200">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="flex items-center space-x-2 text-xl antialiased text-white">
          <span>GitHub App installed</span>
          <span className="w-6 h-6 text-green-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </h3>

        <p className="mt-1 max-w-2xl text-sm text-gray-300 antialiased">
          {formatDate(props.createdAt)}
        </p>
      </div>

      <dl className="antialiased border-t border-b border-gray-600">
        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-gray-400">Name</dt>
          <dd className="mt-1 sm:mt-0 sm:col-span-2 text-gray-300">
            <a
              className="underline focus:outline-white"
              href={props.appPageLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.appName}
            </a>
          </dd>
        </div>

        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-gray-400">Installation ID</dt>
          <dd className="mt-1 sm:mt-0 sm:col-span-2 text-gray-300">
            <a
              className="underline focus:outline-white"
              href={`${props.appSettingsLink}/${props.installationId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.installationId}
            </a>
          </dd>
        </div>
      </dl>

      <div className="flex items-center space-x-1 px-4 py-5 sm:px-6 text-gray-400 antialiased">
        <InfoIcon className="hidden sm:block w-6 h-6" />
        <p className="text-sm">
          We use our GitHub App to access- and interact with your repositories.
        </p>
      </div>
    </div>
  )
}

export const GitHub = (): JSX.Element => {
  const { isLoading, user } = useUser()
  const hasSession = !isLoading && Boolean(user)

  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [provider, setProvider] = useState<null | GitHubProvider>(null)
  const [repos, setRepos] = useState<null | GitHubRepo[]>(null)

  useEffect(() => {
    if (!hasSession) {
      return
    }

    setIsFetching(true)
    fetch(githubMeEndpoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch GitHub Provider data for user")
        }

        return res.json()
      })
      .then((json: GitHubProviderMeResponse) => {
        const { provider, repos } = json
        if (provider != null) {
          setProvider(provider)
        }
        if (repos != null) {
          setRepos(repos)
        }
      })
      .catch((err) => {
        // TODO: handle error
        console.error(err)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, [hasSession])

  return (
    <AppShell>
      <ContentContainer>
        <ContentHeader
          isLoading={!hasSession}
          title="Connect repository"
          subtitle="Choose a Git repository to create your library."
        />

        <div className="my-8 lg:w-1/2">
          {isFetching ? (
            <AppInfoLoading />
          ) : (
            <>
              {provider ? (
                <AppInfo
                  appName={appName}
                  appPageLink={appPageLink}
                  appSettingsLink={appSettingsLink}
                  appInstallLink={appInstallLink}
                  installationId={provider.installationId}
                  createdAt={provider.createdAt}
                />
              ) : (
                <AppInstall
                  appPageLink={appPageLink}
                  newRepoLink={newRepoLink}
                  appInstallLink={appInstallLink}
                />
              )}
            </>
          )}
        </div>

        {repos && (
          <ContenteSection className="my-8">
            <ContentSectionTitle className="border-b border-gray-600">
              Repositories
            </ContentSectionTitle>

            <List>
              {repos.map((repo) => {
                const repoFullName = `${repo.owner.username}/${repo.name}`
                const repoLink = `${githubDomain}/${repoFullName}`

                return (
                  <ListItem key={repo.id}>
                    <div className="flex justify-between items-center space-x-2">
                      <div className="flex items-center space-x-2 truncate">
                        <GitHubIcon className="w-8 h-8 text-white hidden sm:block" />

                        <span className="text-gray-300 antialiased truncate">
                          <a
                            className="underline focus:outline-white"
                            href={repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {repoFullName}
                          </a>
                        </span>
                      </div>

                      <Link href="">
                        <a className="text-white btn bg-purple-500 hover:bg-purple-400 focus:ring-white">
                          Connect
                        </a>
                      </Link>
                    </div>
                  </ListItem>
                )
              })}
            </List>

            <div className="flex items-center space-x-1 px-4 py-5 sm:px-6 text-gray-400 border-t border-gray-600">
              <InfoIcon className="hidden sm:block w-6 h-6" />
              <p className="text-sm">
                Don&apos;t see your repository? Click on the <b>Installation ID</b> link above to
                manage repository access on GitHub.
              </p>
            </div>
          </ContenteSection>
        )}
      </ContentContainer>
    </AppShell>
  )
}

export default GitHub
