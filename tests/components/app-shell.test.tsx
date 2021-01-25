import { render } from "@testing-library/react"
import { useSession, useLoginIsRequired, Session } from "@lib/auth0"
import { AppShell } from "@components/shell"
import { dashboardRoute, logoutUrl } from "@config/auth"

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
      expect(logo.parentNode).toHaveAttribute("href", dashboardRoute)
    })

    it(`renders nav`, () => {
      const { getAllByText } = render(<AppShell />)

      const dashboardLinks = getAllByText("Dashboard")
      for (const link of dashboardLinks) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", dashboardRoute)
      }

      const booksLinks = getAllByText("Books")
      for (const link of booksLinks) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", `${dashboardRoute}/books`)
      }

      const librariesLinks = getAllByText("Libraries")
      for (const link of librariesLinks) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", `${dashboardRoute}/libraries`)
      }
    })

    it(`renders footer`, () => {
      const { getByText, getByTestId } = render(<AppShell />)

      const homeLink = getByText("Homepage")
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
      expect(logo.parentNode).toHaveAttribute("href", dashboardRoute)
    })

    it(`renders nav`, () => {
      const { getAllByText } = render(<AppShell />)

      const dashboardLinks = getAllByText("Dashboard")
      for (const link of dashboardLinks) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", dashboardRoute)
      }

      const booksLinks = getAllByText("Books")
      for (const link of booksLinks) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", `${dashboardRoute}/books`)
      }

      const librariesLinks = getAllByText("Libraries")
      for (const link of librariesLinks) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", `${dashboardRoute}/libraries`)
      }
    })

    it(`renders user's avatar`, () => {
      const { getByTestId } = render(<AppShell />)
      const avatar = getByTestId("avatar")
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveAttribute("src", fakeUser.avatar)
    })

    it(`renders footer`, () => {
      const { getByText, getByTestId } = render(<AppShell />)

      const homeLink = getByText("Homepage")
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
