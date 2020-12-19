const auth0 = jest.fn(() => {
  return {}
})
export default auth0

export const useFetchSession = jest.fn(() => {
  return {
    user: null,
    isLoading: true,
  }
})
