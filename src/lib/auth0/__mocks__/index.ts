const auth0 = jest.fn(() => {
  return {}
})
export default auth0

export const useSession = jest.fn(() => {
  return {
    user: null,
    isLoading: true,
  }
})

export const useLoginIsRequired = jest.fn()
