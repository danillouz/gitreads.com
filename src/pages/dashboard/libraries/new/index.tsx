import { useUser } from "@auth0/nextjs-auth0"
import Link from "next/link"
import clsx from "clsx"

import { AppShell } from "@components/shell"
import { ContentHeader, ContentContainer } from "@components/content"
import { GitHubIcon, AirtableIcon } from "@components/icons"
import { dashboardRoute } from "@config/auth"

type CardContainerProps = {
  isPreview: boolean
  href: string
  children: React.ReactNode
}

const CardContainer = (props: CardContainerProps): JSX.Element => {
  const { isPreview, href, children } = props

  const className = clsx(
    "w-full p-5 mb-5 sm:mr-5 sm:w-72 rounded-md shadow-sm dark:shadow-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600",
    {
      "dark:focus:outline-white": !isPreview,
      "cursor-not-allowed": isPreview,
    }
  )

  if (isPreview) {
    return <div className={className}>{children}</div>
  }

  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  )
}

type CardProps = {
  isLoading: boolean
  isPreview?: boolean
  href?: string
  icon: React.ReactNode
  title: React.ReactNode | string
  description: React.ReactNode | string
}

const ProviderCard = (props: CardProps): JSX.Element => {
  if (props.isLoading) {
    return (
      <div className="w-full p-5 mb-5 sm:mr-5 sm:w-72 rounded-md shadow-sm dark:shadow-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 cursor-wait">
        <div className="animate-pulse">
          <div className="w-14 h-14 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="w-28 mt-4 mb-1 rounded h-7 bg-gray-200 dark:bg-gray-700" />
          <div className="w-40 h-6 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="w-32 h-7 mt-6 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    )
  }

  return (
    <CardContainer isPreview={props.isPreview} href={props.href}>
      <span className="flex items-center justify-center dark:bg-gray-50 rounded-xl w-14 h-14">
        {props.icon}
      </span>

      <h3 className="mt-4 mb-1 text-lg font-medium text-gray-800 dark:text-gray-50 dark:antialiased">
        {props.title}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 dark:antialiased">{props.description}</p>

      {props.isPreview && (
        <span className="inline-block mt-6 text-sm font-medium tracking-wider px-2 py-1 rounded-full bg-gray-800 dark:bg-gray-600 text-gray-50 dark:text-gray-300 dark:antialiased">
          Coming soon
        </span>
      )}
    </CardContainer>
  )
}

export const NewLibrary = (): JSX.Element => {
  const { isLoading, user } = useUser()
  const hasSession = !isLoading && Boolean(user)

  return (
    <AppShell>
      <ContentContainer>
        <ContentHeader
          isLoading={!hasSession}
          title="New library"
          subtitle="Connect to a provider to store books."
        />

        <div className="flex flex-wrap my-8">
          <ProviderCard
            isLoading={!hasSession}
            href={`${dashboardRoute}/libraries/new/github`}
            icon={<GitHubIcon className="w-12 h-12" />}
            title="GitHub"
            description="Connect to a Git repository."
          />

          <ProviderCard
            isLoading={!hasSession}
            isPreview
            icon={<AirtableIcon className="w-10 h-10" />}
            title="Airtable"
            description="Connect to a base."
          />
        </div>
      </ContentContainer>
    </AppShell>
  )
}

export default NewLibrary
