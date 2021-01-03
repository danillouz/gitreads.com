import { useSession } from "@lib/auth0"
import { AppShell } from "@components/shell"
import { Header, Container } from "@components/content"

export const GitHub = (): JSX.Element => {
  const { isLoading, user } = useSession()
  const hasSession = !isLoading && Boolean(user)

  return (
    <AppShell>
      <Header isLoading={!hasSession} title="GitHub" subtitle="" />

      <Container>.</Container>
    </AppShell>
  )
}

export default GitHub
