import { useUser } from "@auth0/nextjs-auth0"
import Link from "next/link"
import clsx from "clsx"

import { AppShell } from "@components/shell"
import { ContentHeader, ContentContainer } from "@components/content"
import { GitHubIcon, AirtableIcon, NotionIcon } from "@components/icons"
import { dashboardRoute } from "@config/auth"

type CardContainerProps = {
  isPreview: boolean
  href: string
  children: React.ReactNode
}

const CardContainer = (props: CardContainerProps): JSX.Element => {
  const { isPreview, href, children } = props

  const className = clsx(
    "w-full p-5 mb-5 transition duration-200 bg-gray-800 border border-gray-600 rounded-lg sm:mr-5 sm:w-72",
    {
      "cursor-not-allowed": isPreview,
      "hover:bg-gray-700 focus:outline-white": !isPreview,
      "border-dashed": isPreview,
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
      <div className="w-full p-5 mb-5 bg-gray-800 border border-gray-700 rounded-lg cursor-wait sm:mr-5 sm:w-72">
        <div className="animate-pulse">
          <div data-testid="skeleton" className="bg-gray-400 rounded-xl w-14 h-14" />
          <div data-testid="skeleton" className="w-28 mt-4 mb-1 bg-gray-400 rounded h-7" />
          <div data-testid="skeleton" className="w-40 h-6 bg-gray-400 rounded" />
          <div data-testid="skeleton" className="w-32 h-5 mt-5 bg-gray-400 rounded" />
        </div>
      </div>
    )
  }

  return (
    <CardContainer isPreview={props.isPreview} href={props.href}>
      <span className="flex items-center justify-center bg-gray-100 shadow-sm rounded-xl w-14 h-14 ">
        {props.icon}
      </span>

      <h3 className="mt-4 mb-1 text-lg antialiased font-medium text-gray-300">{props.title}</h3>

      <p className="text-gray-400 antialiased">{props.description}</p>

      <span className="block h-5 mt-5 text-sm font-medium tracking-wider text-white antialiased uppercase">
        {props.isPreview ? "Coming soon" : null}
      </span>
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

          <ProviderCard
            isLoading={!hasSession}
            isPreview
            icon={<NotionIcon className="w-10 h-10" />}
            title="Notion"
            description="Connect to a page."
          />
        </div>
      </ContentContainer>
    </AppShell>
  )
}

export default NewLibrary
