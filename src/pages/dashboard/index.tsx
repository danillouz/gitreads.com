import { ReactNode } from "react"
import Link from "next/link"
import clsx from "clsx"
import { useUser } from "@auth0/nextjs-auth0"

import { AppShell } from "@components/shell"
import { ContentHeader, ContentContainer } from "@components/content"
import { LibraryIcon, BookIcon, GlobeIcon } from "@components/icons"
import { dashboardRoute } from "@config/auth"

type ActionProps = {
  href: string
  icon: React.ReactNode
  name: string | ReactNode
  className?: string
}

export const Action = (props: ActionProps): JSX.Element => {
  return (
    <Link href={props.href}>
      <a
        className={clsx(
          "flex sm:flex-col items-center sm:justify-center sm:mr-5 mb-6 sm:mb-5 px-5 sm:px-2 py-5 w-full sm:w-40 h-18 sm:h-30 space-x-3 sm:space-x-0 sm:space-y-1 font-medium text-lg sm:text-base tracking-wider rounded-md border border-gray-800 shadow-retro hover:shadow-retro-lg focus:outline-none focus:shadow-retro-lg dark:focus:outline-white transition duration-200",
          props.className
        )}
      >
        {props.icon} <span>{props.name}</span>
      </a>
    </Link>
  )
}

export const Dashboard = (): JSX.Element => {
  const { user, isLoading } = useUser()

  const hasSession = !isLoading && Boolean(user)
  const [firstName] = user?.name.split(" ") || []

  return (
    <AppShell>
      <ContentContainer>
        <ContentHeader
          isLoading={!hasSession}
          title="Dashboard"
          subtitle={firstName ? `Welcome back ${firstName}. 👋` : "Welcome back. 👋"}
        />

        <div className="flex flex-wrap my-8">
          <Action
            className="bg-purple-100 hover:bg-purple-50 focus:bg-purple-50 dark:bg-gray-800 dark:border-purple-300 dark:text-purple-300"
            href={`${dashboardRoute}/books/new`}
            icon={<BookIcon className="w-8 h-8 sm:w-10 sm:h-10" />}
            name="Add book"
          />

          <Action
            className="bg-blue-100 hover:bg-blue-50 focus:bg-blue-50 dark:bg-gray-800 dark:border-blue-300 dark:text-blue-300"
            href={`${dashboardRoute}/libraries/new`}
            icon={<LibraryIcon className="w-8 h-8 sm:w-10 sm:h-10" />}
            name="New library"
          />

          <Action
            className="bg-green-100 hover:bg-green-50 focus:bg-green-50 dark:bg-gray-800 dark:border-green-300 dark:text-green-300"
            href={`/${user?.nickname}`}
            icon={<GlobeIcon className="w-8 h-8 sm:w-10 sm:h-10" />}
            name="Public profile"
          />
        </div>
      </ContentContainer>
    </AppShell>
  )
}

export default Dashboard
