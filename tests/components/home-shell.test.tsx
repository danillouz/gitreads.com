import { render } from "@testing-library/react"
import { useUser, UserContext } from "@auth0/nextjs-auth0"

import { HomeShell } from "@components/shell"
import { dashboardRoute, loginUrl, signupUrl, logoutUrl } from "@config/auth"

import { fakeUser } from "../fixtures/session"

jest.mock("@auth0/nextjs-auth0")

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>

describe(`Home shell`, () => {
  beforeEach(() => {
    mockUseUser.mockClear()
  })

  describe(`when loading the user session`, () => {
    beforeEach(() => {
      mockUseUser.mockImplementation(
        (): UserContext => {
          return {
            user: null,
            isLoading: true,
            checkSession: () => Promise.resolve(),
          }
        }
      )
    })

    afterEach(() => {
      expect(mockUseUser).toBeCalledTimes(1)
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
      mockUseUser.mockImplementation(
        (): UserContext => {
          return {
            user: null,
            isLoading: false,
            checkSession: () => Promise.resolve(),
          }
        }
      )
    })

    afterEach(() => {
      expect(mockUseUser).toBeCalledTimes(1)
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
      mockUseUser.mockImplementation(
        (): UserContext => {
          return {
            user: fakeUser,
            isLoading: false,
            checkSession: () => Promise.resolve(),
          }
        }
      )
    })

    afterEach(() => {
      expect(mockUseUser).toBeCalledTimes(1)
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
      expect(link).toHaveAttribute("href", dashboardRoute)
    })

    it(`renders user's avatar`, () => {
      const { getByTestId } = render(<HomeShell />)
      const avatar = getByTestId("avatar")
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveAttribute("src", fakeUser.picture)
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
