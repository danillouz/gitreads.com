import { render } from "@testing-library/react"
import { useUser, UserContext } from "@auth0/nextjs-auth0"

import { Home } from "@pages/index"
import { dashboardRoute } from "@config/auth"

import { fakeUser } from "../fixtures/session"

jest.mock("@auth0/nextjs-auth0")

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>

describe(`Home`, () => {
  beforeEach(() => {
    mockUseUser.mockClear()
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

    it(`renders main CTA`, () => {
      const { getByText } = render(<Home />)
      const cta = getByText("Git started for free")
      expect(cta).toBeInTheDocument()
      expect(cta.parentNode).toHaveAttribute("href", dashboardRoute)
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

    it(`renders main CTA`, () => {
      const { getByText } = render(<Home />)
      const cta = getByText("Git started for free")
      expect(cta).toBeInTheDocument()
      expect(cta.parentNode).toHaveAttribute("href", dashboardRoute)
    })
  })
})
