import { render } from "@testing-library/react"
import { useUser, UserContext } from "@auth0/nextjs-auth0"

import { useLoginIsRequired } from "@lib/auth0"
import { Dashboard } from "@pages/dashboard/index"
import { dashboardRoute } from "@config/auth"

import { fakeUser } from "../fixtures/session"

jest.mock("@auth0/nextjs-auth0")
jest.mock("@lib/auth0")

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>
const mockUseLoginIsRequired = useLoginIsRequired as jest.MockedFunction<typeof useLoginIsRequired>

describe(`Dashboard`, () => {
  beforeEach(() => {
    mockUseUser.mockClear()
    mockUseLoginIsRequired.mockClear()
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
      expect(mockUseUser).toBeCalledTimes(2)
      expect(mockUseLoginIsRequired).toBeCalledTimes(1)
    })

    it(`renders quick actions`, () => {
      const { getByText } = render(<Dashboard />)

      const addBook = getByText("Add book")
      expect(addBook).toBeInTheDocument()

      const newLibrary = getByText("New library")
      expect(newLibrary).toBeInTheDocument()

      const publicProfile = getByText("Public profile")
      expect(publicProfile).toBeInTheDocument()
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
      expect(mockUseUser).toBeCalledTimes(2)
      expect(mockUseLoginIsRequired).toBeCalledTimes(1)
    })

    it(`renders header title`, () => {
      const { getByTestId } = render(<Dashboard />)
      const header = getByTestId("content-header")
      expect(header).toBeInTheDocument()
      expect(header).toHaveTextContent("Dashboard")
    })

    it(`renders welcome message`, () => {
      const { getByTestId } = render(<Dashboard />)
      const [firstName] = fakeUser.name.split(" ") || []
      const subtitle = getByTestId("content-subtitle")
      expect(subtitle).toBeInTheDocument()
      expect(subtitle).toHaveTextContent(`Welcome back ${firstName}. 👋`)
    })

    it(`renders quick actions`, () => {
      const { getByText } = render(<Dashboard />)

      const addBook = getByText("Add book")
      expect(addBook).toBeInTheDocument()
      expect(addBook.parentNode).toHaveAttribute("href", `${dashboardRoute}/books/new`)

      const newLibrary = getByText("New library")
      expect(newLibrary).toBeInTheDocument()
      expect(newLibrary.parentNode).toHaveAttribute("href", `${dashboardRoute}/libraries/new`)

      const publicProfile = getByText("Public profile")
      expect(publicProfile).toBeInTheDocument()
      expect(publicProfile.parentNode).toHaveAttribute("href", `/${fakeUser.nickname}`)
    })
  })
})
