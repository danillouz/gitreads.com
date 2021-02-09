import { useUser } from "@auth0/nextjs-auth0"

import { AppShell } from "@components/shell"
import { ContentHeader, ContentContainer, ContentAction } from "@components/content"
import { LibraryIcon, BookIcon, GlobeIcon } from "@components/icons"
import { dashboardRoute } from "@config/auth"

type QuickActionsProps = {
  isLoading: boolean
  username?: string
}

const QuickActions = (props: QuickActionsProps): JSX.Element => {
  const { isLoading } = props

  return (
    <>
      <ContentAction
        isLoading={isLoading}
        className="orange-gradient"
        href={`${dashboardRoute}/books/new`}
        icon={<BookIcon className="w-8 h-8 sm:w-10 sm:h-10" />}
        name="Add book"
      />

      <ContentAction
        isLoading={isLoading}
        className="blue-gradient"
        href={`${dashboardRoute}/libraries/new`}
        icon={<LibraryIcon className="w-8 h-8 sm:w-10 sm:h-10" />}
        name="New library"
      />

      <ContentAction
        isLoading={isLoading}
        className="pink-gradient"
        href={`/${props.username}`}
        icon={<GlobeIcon className="w-8 h-8 sm:w-10 sm:h-10" />}
        name="Public profile"
      />
    </>
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
          <QuickActions isLoading={!hasSession} username={user?.nickname} />
        </div>
      </ContentContainer>
    </AppShell>
  )
}

export default Dashboard
