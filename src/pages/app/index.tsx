import { useSession } from "@lib/auth0"
import { AppShell } from "@components/shell"
import { ContentHeader, ContentContainer, ContentAction } from "@components/content"
import { LibraryIcon, BookIcon, GlobeIcon } from "@components/icons"
import { appRoute } from "@config/auth"

type QuickActionsProps = {
  isLoading: boolean
  username: string
}

const QuickActions = (props: QuickActionsProps): JSX.Element => {
  const { isLoading } = props

  return (
    <>
      <ContentAction
        isLoading={isLoading}
        className="orange-gradient"
        href={`${appRoute}/books/new`}
        icon={<BookIcon className="w-8 h-8 sm:w-10 sm:h-10" />}
        name="Add book"
      />

      <ContentAction
        isLoading={isLoading}
        className="blue-gradient"
        href={`${appRoute}/libraries/new`}
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

export const App = (): JSX.Element => {
  const { isLoading, user } = useSession()
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
          <QuickActions isLoading={!hasSession} username={user?.username} />
        </div>
      </ContentContainer>
    </AppShell>
  )
}

export default App
