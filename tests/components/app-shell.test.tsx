import { render } from "@testing-library/react"
import { useSession, useLoginIsRequired, Session } from "@lib/auth0"
import { AppShell } from "@components/shell"
import { appRoute, logoutUrl } from "@config/auth"

import { fakeUser } from "../fixtures/session"

jest.mock("@lib/auth0")

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>
const mockUseLoginIsRequired = useLoginIsRequired as jest.MockedFunction<typeof useLoginIsRequired>

describe(`App shell`, () => {
  beforeEach(() => {
    mockUseSession.mockClear()
    mockUseLoginIsRequired.mockClear()
  })

  describe(`without a user session`, () => {
    beforeEach(() => {
      mockUseSession.mockImplementation(
        (): Session => {
          return {
            user: null,
            isLoading: false,
          }
        }
      )
    })

    afterEach(() => {
      expect(mockUseSession).toBeCalledTimes(1)
      expect(mockUseLoginIsRequired).toBeCalledTimes(1)
    })

    it(`renders logo`, () => {
      const { getByTestId } = render(<AppShell />)
      const logo = getByTestId("logo")
      expect(logo).toBeInTheDocument()
      expect(logo.parentNode).toHaveAttribute("href", "/app")
    })

    it(`does not render nav`, () => {
      const { queryAllByText } = render(<AppShell />)

      const booksLink = queryAllByText("Books")
      expect(booksLink).toHaveLength(0)

      const librariesLink = queryAllByText("Libraries")
      expect(librariesLink).toHaveLength(0)
    })

    it(`renders footer`, () => {
      const { getByText, getByTestId } = render(<AppShell />)

      const homeLink = getByText("Home")
      expect(homeLink).toBeInTheDocument()
      expect(homeLink).toHaveAttribute("href", "/")

      const githubLink = getByText("GitHub")
      expect(githubLink).toBeInTheDocument()
      expect(githubLink).toHaveAttribute("href", "https://github.com/gitreads")
      expect(githubLink).toHaveAttribute("target", "_blank")
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer")

      const aboutLink = getByText("About")
      expect(aboutLink).toBeInTheDocument()
      expect(aboutLink).toHaveAttribute("href", "https://danillouz.dev")
      expect(aboutLink).toHaveAttribute("target", "_blank")
      expect(aboutLink).toHaveAttribute("rel", "noopener noreferrer")

      const copyright = getByTestId("copyright")
      expect(copyright).toBeInTheDocument()
      expect(copyright).toHaveTextContent(`© ${new Date().getFullYear()} GitReads`)
    })
  })

  describe(`with a user session`, () => {
    beforeEach(() => {
      mockUseSession.mockImplementation(
        (): Session => {
          return {
            user: fakeUser,
            isLoading: false,
          }
        }
      )
    })

    afterEach(() => {
      expect(mockUseSession).toBeCalledTimes(1)
      expect(mockUseLoginIsRequired).toBeCalledTimes(1)
    })

    it(`renders logo`, () => {
      const { getByTestId } = render(<AppShell />)
      const logo = getByTestId("logo")
      expect(logo).toBeInTheDocument()
      expect(logo.parentNode).toHaveAttribute("href", appRoute)
    })

    it(`renders nav`, () => {
      const { getAllByText } = render(<AppShell />)

      const booksLinks = getAllByText("Books")
      for (const link of booksLinks) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", `${appRoute}/books`)
      }

      const librariesLinks = getAllByText("Libraries")
      for (const link of librariesLinks) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", `${appRoute}/libraries`)
      }
    })

    it(`renders user's avatar`, () => {
      const { getAllByTestId } = render(<AppShell />)
      const avatars = getAllByTestId("avatar")
      expect(avatars).toHaveLength(2)

      for (const link of avatars) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("src", fakeUser.avatar)
      }
    })

    it(`renders user's full name`, () => {
      const { getAllByText } = render(<AppShell />)
      const avatars = getAllByText(fakeUser.name)
      expect(avatars).toHaveLength(2)

      for (const link of avatars) {
        expect(link).toBeInTheDocument()
      }
    })

    it(`renders user's email`, () => {
      const { getAllByText } = render(<AppShell />)
      const avatars = getAllByText(fakeUser.email)
      expect(avatars).toHaveLength(2)

      for (const link of avatars) {
        expect(link).toBeInTheDocument()
      }
    })

    it(`renders logout link`, () => {
      const { getAllByText } = render(<AppShell />)
      const links = getAllByText("Logout")
      expect(links).toHaveLength(2)

      for (const link of links) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", logoutUrl)
      }
    })

    it(`renders footer`, () => {
      const { getByText, getByTestId } = render(<AppShell />)

      const homeLink = getByText("Home")
      expect(homeLink).toBeInTheDocument()
      expect(homeLink).toHaveAttribute("href", "/")

      const githubLink = getByText("GitHub")
      expect(githubLink).toBeInTheDocument()
      expect(githubLink).toHaveAttribute("href", "https://github.com/gitreads")
      expect(githubLink).toHaveAttribute("target", "_blank")
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer")

      const aboutLink = getByText("About")
      expect(aboutLink).toBeInTheDocument()
      expect(aboutLink).toHaveAttribute("href", "https://danillouz.dev")
      expect(aboutLink).toHaveAttribute("target", "_blank")
      expect(aboutLink).toHaveAttribute("rel", "noopener noreferrer")

      const copyright = getByTestId("copyright")
      expect(copyright).toBeInTheDocument()
      expect(copyright).toHaveTextContent(`© ${new Date().getFullYear()} GitReads`)
    })
  })
})
