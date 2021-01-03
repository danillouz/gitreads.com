import Link from "next/link"
import clsx from "clsx"
import { useSession } from "@lib/auth0"
import { AppShell } from "@components/shell"
import { Header, Container } from "@components/content"
import { GitHubIcon, AirtableIcon, NotionIcon } from "@components/icons"
import { appRoute } from "@config/auth"

type CardContainerProps = {
  isPreview: boolean
  href: string
  children: React.ReactNode
}

const CardContainer = (props: CardContainerProps): JSX.Element => {
  const { isPreview, href, children } = props

  const className = clsx(
    "w-full p-5 mb-5 transition duration-200 bg-white rounded-lg shadow-md sm:mr-5 sm:w-72 transform-gpu",
    {
      "cursor-not-allowed": isPreview,
      "hover:scale-105 hover:shadow-lg focus:outline-none focus:scale-105 focus:shadow-lg": !isPreview,
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
      <div className="w-full p-5 mb-5 bg-white rounded-lg shadow-md cursor-wait sm:mr-5 sm:w-72">
        <div className="animate-pulse">
          <div data-testid="skeleton" className="w-10 h-10 bg-gray-300 rounded-full" />
          <div data-testid="skeleton" className="w-1/3 mt-4 mb-1 bg-gray-300 rounded h-7" />
          <div data-testid="skeleton" className="w-full h-6 bg-gray-300 rounded" />
          <div data-testid="skeleton" className="w-1/2 h-5 mt-5 bg-gray-300 rounded" />
        </div>
      </div>
    )
  }

  return (
    <CardContainer isPreview={props.isPreview} href={props.href}>
      <span className="block w-10 h-10">{props.icon}</span>
      <h3 className="mt-4 mb-1 text-lg">{props.title}</h3>
      <p className="text-gray-500">{props.description}</p>
      <span className="block h-5 mt-5 text-sm tracking-wider text-gray-400 uppercase">
        {props.isPreview ? "Coming soon" : null}
      </span>
    </CardContainer>
  )
}

export const NewLibrary = (): JSX.Element => {
  const { isLoading, user } = useSession()
  const hasSession = !isLoading && Boolean(user)

  return (
    <AppShell>
      <Header
        isLoading={!hasSession}
        title="New library"
        subtitle="Connect to a provider to store your books."
      />

      <Container>
        <div className="flex flex-wrap">
          <ProviderCard
            isLoading={!hasSession}
            href={`${appRoute}/libraries/new/github`}
            icon={<GitHubIcon />}
            title="GitHub"
            description="Connect to a Git repository."
          />

          <ProviderCard
            isLoading={!hasSession}
            isPreview
            icon={<AirtableIcon />}
            title="Airtable"
            description="Connect to a base."
          />

          <ProviderCard
            isLoading={!hasSession}
            isPreview
            icon={<NotionIcon />}
            title="Notion"
            description="Connect to a page."
          />
        </div>
      </Container>
    </AppShell>
  )
}

export default NewLibrary
