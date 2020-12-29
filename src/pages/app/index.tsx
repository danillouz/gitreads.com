import { useSession } from "@lib/auth0"
import { AppShell } from "@components/shell"
import { Header, Container, Action } from "@components/content"
import { LibraryIcon, BookIcon, GlobeIcon } from "@components/icons"

type QuickActionsProps = {
  isLoading: boolean
  username: string
}

const QuickActions = (props: QuickActionsProps): JSX.Element => {
  const { isLoading } = props

  return (
    <div className="flex flex-wrap mb-5">
      <Action
        isLoading={isLoading}
        className="orange-gradient"
        href="/app/books/new"
        icon={<BookIcon className="w-8 h-8 sm:w-10 sm:h-10" />}
        name="Add book"
      />

      <Action
        isLoading={isLoading}
        className="purple-gradient"
        href="/app/libraries/new"
        icon={<LibraryIcon className="w-8 h-8 sm:w-10 sm:h-10" />}
        name="New library"
      />

      <Action
        isLoading={isLoading}
        className="pink-gradient"
        href={`/${props.username}`}
        icon={<GlobeIcon className="w-8 h-8 sm:w-10 sm:h-10" />}
        name="Public profile"
      />
    </div>
  )
}

export const App = (): JSX.Element => {
  const { isLoading, user } = useSession()
  const hasSession = !isLoading && Boolean(user)
  const [firstName] = user?.name.split(" ") || []

  return (
    <AppShell>
      <Header
        isLoading={!hasSession}
        title="Dashboard"
        subtitle={firstName ? `Welcome back ${firstName}. 👋` : "Welcome back. 👋"}
      />

      <Container>
        <QuickActions isLoading={!hasSession} username={user?.username} />
      </Container>
    </AppShell>
  )
}

export default App
