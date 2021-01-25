import { render } from "@testing-library/react"
import { useSession, Session } from "@lib/auth0"
import { HomeShell } from "@components/shell"
import { appRoute, loginUrl, signupUrl, logoutUrl } from "@config/auth"

import { fakeUser } from "../fixtures/session"

jest.mock("@lib/auth0")

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

describe(`Home shell`, () => {
  beforeEach(() => {
    mockUseSession.mockClear()
  })

  describe(`when loading the user session`, () => {
    beforeEach(() => {
      mockUseSession.mockImplementation(
        (): Session => {
          return {
            user: null,
            isLoading: true,
          }
        }
      )
    })

    afterEach(() => {
      expect(mockUseSession).toBeCalledTimes(1)
    })

    it(`renders logo`, () => {
      const { getAllByTestId } = render(<HomeShell />)
      const logos = getAllByTestId("logo")
      for (const logo of logos) {
        expect(logo).toBeInTheDocument()
        expect(logo.parentNode).toHaveAttribute("href", "/")
      }
    })

    it(`does not render login link`, () => {
      const { queryAllByText } = render(<HomeShell />)
      const links = queryAllByText("Login")
      expect(links).toHaveLength(0)
    })

    it(`does not render signup link`, () => {
      const { queryAllByText } = render(<HomeShell />)
      const links = queryAllByText("Signup")
      expect(links).toHaveLength(0)
    })
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
    })

    it(`renders logo`, () => {
      const { getAllByTestId } = render(<HomeShell />)
      const logos = getAllByTestId("logo")
      for (const logo of logos) {
        expect(logo).toBeInTheDocument()
        expect(logo.parentNode).toHaveAttribute("href", "/")
      }
    })

    it(`renders login link`, () => {
      const { getByText } = render(<HomeShell />)
      const link = getByText("Login")
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", loginUrl)
    })

    it(`renders signup link`, () => {
      const { getByText } = render(<HomeShell />)
      const link = getByText("Signup")
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", signupUrl)
    })

    it(`renders footer`, () => {
      const { getByText, getByTestId } = render(<HomeShell />)

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
      expect(copyright).toHaveTextContent(`Copyright © ${new Date().getFullYear()} GitReads`)
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
    })

    it(`renders logo`, () => {
      const { getAllByTestId } = render(<HomeShell />)
      const logos = getAllByTestId("logo")
      for (const logo of logos) {
        expect(logo).toBeInTheDocument()
        expect(logo.parentNode).toHaveAttribute("href", "/")
      }
    })

    it(`renders dashboard link`, () => {
      const { getByText } = render(<HomeShell />)
      const link = getByText("Dashboard")
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", appRoute)
    })

    it(`renders user's avatar`, () => {
      const { getByTestId } = render(<HomeShell />)
      const avatar = getByTestId("avatar")
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveAttribute("src", fakeUser.avatar)
    })

    it(`renders user's full name`, () => {
      const { getByText } = render(<HomeShell />)
      const name = getByText(fakeUser.name)
      expect(name).toBeInTheDocument()
    })

    it(`renders user's email`, () => {
      const { getByText } = render(<HomeShell />)
      const email = getByText(fakeUser.email)
      expect(email).toBeInTheDocument()
    })

    it(`renders logout link`, () => {
      const { getByText } = render(<HomeShell />)
      const link = getByText("Logout")
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", logoutUrl)
    })

    it(`renders footer`, () => {
      const { getByText, getByTestId } = render(<HomeShell />)

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
      expect(copyright).toHaveTextContent(`Copyright © ${new Date().getFullYear()} GitReads`)
    })
  })
})
