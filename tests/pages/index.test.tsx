import { render } from "@testing-library/react"
import { useFetchSession, Session, User } from "@lib/auth0"
import { Home } from "@pages/index"

jest.mock("@lib/auth0")

const mockUseFetchSession = useFetchSession as jest.MockedFunction<typeof useFetchSession>

describe(`Home`, () => {
  beforeEach(() => {
    mockUseFetchSession.mockClear()
  })

  describe(`when loading the user session`, () => {
    beforeEach(() => {
      mockUseFetchSession.mockImplementation(
        (): Session => {
          return {
            user: null,
            isLoading: true,
          }
        }
      )
    })

    it("renders loading message", () => {
      const { getByText } = render(<Home />)
      const el = getByText("Loading..")
      expect(el).toBeInTheDocument()
      expect(mockUseFetchSession).toBeCalledTimes(1)
    })
  })

  describe("without a user session", () => {
    beforeEach(() => {
      mockUseFetchSession.mockImplementation(
        (): Session => {
          return {
            user: null,
            isLoading: false,
          }
        }
      )
    })

    it("renders login link", () => {
      const { getByText } = render(<Home />)
      const el = getByText("Login")
      expect(el).toBeInTheDocument()
      expect(el).toHaveAttribute("href", "/api/auth/login")
      expect(mockUseFetchSession).toBeCalledTimes(1)
    })

    it("renders signup link", () => {
      const { getByText } = render(<Home />)
      const el = getByText("Signup")
      expect(el).toBeInTheDocument()
      expect(el).toHaveAttribute("href", "/api/auth/login?signup=true")
      expect(mockUseFetchSession).toBeCalledTimes(1)
    })
  })

  describe("with a user session", () => {
    const user: User = {
      id: "auth0|5fe1c3f1d1e0eff6c2dff18d",
      name: "Jane Doe",
      username: "jdoe",
      email: "jdoe@gitreads.com",
      emailIsVerified: true,
      avatar: null,
      updatedAt: null,
    }

    beforeEach(() => {
      mockUseFetchSession.mockImplementation(
        (): Session => {
          return {
            user,
            isLoading: false,
          }
        }
      )
    })

    it("renders welcome message", () => {
      const { getByText } = render(<Home />)
      const el = getByText(`Welcome back ${user.name}`)
      expect(el).toBeInTheDocument()
      expect(mockUseFetchSession).toBeCalledTimes(1)
    })

    it("renders logout link", () => {
      const { getByText } = render(<Home />)
      const el = getByText("Logout")
      expect(el).toBeInTheDocument()
      expect(el).toHaveAttribute("href", "/api/auth/logout")
      expect(mockUseFetchSession).toBeCalledTimes(1)
    })
  })
})
