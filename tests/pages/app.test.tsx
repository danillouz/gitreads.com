import { render } from "@testing-library/react"
import { useSession, useLoginIsRequired, Session } from "@lib/auth0"
import { App } from "@pages/app/index"
import { appRoute } from "@config/auth"

import { fakeUser } from "../fixtures/session"

jest.mock("@lib/auth0")

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>
const mockUseLoginIsRequired = useLoginIsRequired as jest.MockedFunction<typeof useLoginIsRequired>

describe(`App`, () => {
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
      expect(mockUseSession).toBeCalledTimes(2)
      expect(mockUseLoginIsRequired).toBeCalledTimes(1)
    })

    it(`renders loading skeleton`, () => {
      const { getAllByTestId } = render(<App />)
      const skeleton = getAllByTestId("skeleton")
      expect(skeleton).toHaveLength(3)
    })

    it(`renders disabled quick actions`, () => {
      const { getByText } = render(<App />)

      const addBook = getByText("Add book")
      expect(addBook).toBeInTheDocument()
      expect(addBook.parentNode).not.toHaveAttribute("href")

      const newLibrary = getByText("New library")
      expect(newLibrary).toBeInTheDocument()
      expect(newLibrary.parentNode).not.toHaveAttribute("href")

      const publicProfile = getByText("Public profile")
      expect(publicProfile).toBeInTheDocument()
      expect(publicProfile.parentNode).not.toHaveAttribute("href")
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
      expect(mockUseSession).toBeCalledTimes(2)
      expect(mockUseLoginIsRequired).toBeCalledTimes(1)
    })

    it(`renders header title`, () => {
      const { getByTestId } = render(<App />)
      const header = getByTestId("content-header")
      expect(header).toBeInTheDocument()
      expect(header).toHaveTextContent("Dashboard")
    })

    it(`renders welcome message`, () => {
      const { getByTestId } = render(<App />)
      const [firstName] = fakeUser.name.split(" ") || []
      const subtitle = getByTestId("content-subtitle")
      expect(subtitle).toBeInTheDocument()
      expect(subtitle).toHaveTextContent(`Welcome back ${firstName}. 👋`)
    })

    it(`renders quick actions`, () => {
      const { getByText } = render(<App />)

      const addBook = getByText("Add book")
      expect(addBook).toBeInTheDocument()
      expect(addBook.parentNode).toHaveAttribute("href", `${appRoute}/books/new`)

      const newLibrary = getByText("New library")
      expect(newLibrary).toBeInTheDocument()
      expect(newLibrary.parentNode).toHaveAttribute("href", `${appRoute}/libraries/new`)

      const publicProfile = getByText("Public profile")
      expect(publicProfile).toBeInTheDocument()
      expect(publicProfile.parentNode).toHaveAttribute("href", `/${fakeUser.username}`)
    })
  })
})
