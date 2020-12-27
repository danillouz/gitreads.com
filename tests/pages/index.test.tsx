import { render } from "@testing-library/react"
import { useSession, Session, User } from "@lib/auth0"
import { Home } from "@pages/index"

jest.mock("@lib/auth0")

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

describe(`Home`, () => {
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

    it(`renders main content`, () => {
      const { getByTestId, getByText } = render(<Home />)

      const logo = getByTestId("logo")
      expect(logo).toBeInTheDocument()

      const hero = getByTestId("hero")
      expect(hero).toBeInTheDocument()

      const cta = getByText("Git started")
      expect(cta).toBeInTheDocument()
      expect(cta).toHaveAttribute("href", "/app")
    })

    it(`does not render login link`, () => {
      const { queryAllByText } = render(<Home />)
      const links = queryAllByText("Login")
      expect(links).toHaveLength(0)
    })

    it(`does not render signup link`, () => {
      const { queryAllByText } = render(<Home />)
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

    it(`renders login link`, () => {
      const { getAllByText } = render(<Home />)
      const links = getAllByText("Login")
      expect(links).toHaveLength(2)

      for (const link of links) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/api/auth/login?redirectTo=%2Fapp")
      }
    })

    it(`renders signup link`, () => {
      const { getAllByText } = render(<Home />)
      const links = getAllByText("Signup")
      expect(links).toHaveLength(2)

      for (const link of links) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/api/auth/login?signup=true&redirectTo=%2Fapp")
      }
    })

    it(`renders main CTA`, () => {
      const { getByText } = render(<Home />)
      const cta = getByText("Git started")
      expect(cta).toBeInTheDocument()
      expect(cta).toHaveAttribute("href", "/app")
    })

    it(`renders footer`, () => {
      const { getByText, getByTestId } = render(<Home />)

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
    const user: User = {
      id: "auth0|5fe1c3f1d1e0eff6c2dff18d",
      name: "Jane Doe",
      username: "jdoe",
      email: "jdoe@gitreads.com",
      emailIsVerified: true,
      avatar: "https://avatar.com/jdoe",
      updatedAt: null,
    }

    beforeEach(() => {
      mockUseSession.mockImplementation(
        (): Session => {
          return {
            user,
            isLoading: false,
          }
        }
      )
    })

    afterEach(() => {
      expect(mockUseSession).toBeCalledTimes(1)
    })

    it(`renders app link`, () => {
      const { getAllByText } = render(<Home />)
      const links = getAllByText("App")
      expect(links).toHaveLength(2)

      for (const link of links) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/app")
      }
    })

    it(`renders user's avatar`, () => {
      const { getAllByTestId } = render(<Home />)
      const avatars = getAllByTestId("avatar")
      expect(avatars).toHaveLength(2)

      for (const link of avatars) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("src", user.avatar)
      }
    })

    it(`renders user's full name`, () => {
      const { getAllByText } = render(<Home />)
      const avatars = getAllByText(user.name)
      expect(avatars).toHaveLength(2)

      for (const link of avatars) {
        expect(link).toBeInTheDocument()
      }
    })

    it(`renders user's email`, () => {
      const { getAllByText } = render(<Home />)
      const avatars = getAllByText(user.email)
      expect(avatars).toHaveLength(2)

      for (const link of avatars) {
        expect(link).toBeInTheDocument()
      }
    })

    it(`renders logout link`, () => {
      const { getAllByText } = render(<Home />)
      const links = getAllByText("Logout")
      expect(links).toHaveLength(2)

      for (const link of links) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/api/auth/logout")
      }
    })

    it(`renders main CTA`, () => {
      const { getByText } = render(<Home />)
      const cta = getByText("Git started")
      expect(cta).toBeInTheDocument()
      expect(cta).toHaveAttribute("href", "/app")
    })

    it(`renders footer`, () => {
      const { getByText, getByTestId } = render(<Home />)

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
