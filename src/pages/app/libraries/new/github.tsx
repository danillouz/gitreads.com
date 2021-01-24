import { useSession } from "@lib/auth0"
import { AppShell } from "@components/shell"
import { ContentHeader, ContentContainer } from "@components/content"

export const GitHub = (): JSX.Element => {
  const { isLoading, user } = useSession()
  const hasSession = !isLoading && Boolean(user)

  return (
    <AppShell>
      <ContentContainer>
        <ContentHeader isLoading={!hasSession} title="GitHub" subtitle="" />
      </ContentContainer>
    </AppShell>
  )
}

export default GitHub
