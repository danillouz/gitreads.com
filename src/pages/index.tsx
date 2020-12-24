import { useState } from "react"
import Link from "next/link"
import classnames from "classnames"
import { UseFetchSessionParams, useFetchSession } from "@lib/auth0"
import Page from "@components/page"
import { UserMenu, UserMenuItem, MobileUserMenu, MobileUserMenuItem } from "@components/user-menu"

const apiBase = "/api/auth"
const appRoute = "/app"
const loginUrl = `${apiBase}/login?redirectTo=${encodeURIComponent(appRoute)}`
const signupUrl = `${apiBase}/login?signup=true&redirectTo=${encodeURIComponent(appRoute)}`
const logoutUrl = `${apiBase}/logout`

export const Home = (): JSX.Element => {
  const params: UseFetchSessionParams = {
    loginIsRequired: false,
  }
  const { user, isLoading } = useFetchSession(params)

  const [mobileNavIsOpen, setMobileNavIsOpen] = useState<boolean>(false)

  const onClickMobileNavBtn = () => setMobileNavIsOpen(!mobileNavIsOpen)

  return (
    <Page>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 bg-gray-800">
          <div className="page-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <a className="focus:outline-white">
                      <img data-testid="logo" className="h-8" src="/gitreads.svg" alt="GitReads" />
                    </a>
                  </Link>
                </div>
              </div>

              <nav className="hidden md:block">
                <div className="ml-4 flex items-baseline space-x-4"></div>
              </nav>

              <div className="flex items-center -mr-2 md:hidden">
                {!isLoading && (
                  <button
                    className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:ring-2 focus:ring-fuchsia-400 transition-colors duration-200"
                    onClick={onClickMobileNavBtn}
                  >
                    <svg
                      className="block h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {mobileNavIsOpen ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 8h16M4 16h16"
                        />
                      )}
                    </svg>
                  </button>
                )}
              </div>

              {!isLoading && (
                <div className="hidden md:block">
                  {user ? (
                    <div className="flex items-center space-x-3">
                      <Link href={appRoute}>
                        <a className="nav-link" role="menuitem">
                          App
                        </a>
                      </Link>

                      <UserMenu avatar={user.avatar} name={user.name} email={user.email}>
                        <UserMenuItem href={logoutUrl}>Logout</UserMenuItem>
                      </UserMenu>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Link href={loginUrl}>
                        <a className="nav-link" role="menuitem">
                          Login
                        </a>
                      </Link>

                      <Link href={signupUrl}>
                        <a
                          className="nav-link text-white antialiased hover:bg-white hover:text-gray-800 border-2 border-white focus:ring-0 focus:bg-white focus:text-gray-800"
                          role="menuitem"
                        >
                          Signup
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {!isLoading && (
          <div
            className={classnames("md:hidden sticky top-16 bg-gray-800 border-t border-gray-700", {
              block: mobileNavIsOpen,
              hidden: !mobileNavIsOpen,
            })}
          >
            {user ? (
              <MobileUserMenu avatar={user.avatar} name={user.name} email={user.email}>
                <MobileUserMenuItem href={appRoute}>App</MobileUserMenuItem>
                <MobileUserMenuItem href={logoutUrl}>Logout</MobileUserMenuItem>
              </MobileUserMenu>
            ) : (
              <div className="px-2 py-3 space-y-1">
                <Link href={loginUrl}>
                  <a className="nav-link" role="menuitem">
                    Login
                  </a>
                </Link>

                <Link href={signupUrl}>
                  <a className="nav-link" role="menuitem">
                    Signup
                  </a>
                </Link>
              </div>
            )}
          </div>
        )}

        <main className="flex-1">
          <div className="page-container">
            <h1
              data-testid="hero"
              className="text-7xl md:text-8xl lg:text-9xl leading-none font-extrabold tracking-tight mt-10 mb-8 sm:mt-14 sm:mb-10"
            >
              <span
                aria-hidden
                className="absolute transform translate-x-2 translate-y-2 text-orange-300"
              >
                Track.
              </span>

              <span
                aria-hidden
                className="absolute transform translate-x-1 translate-y-1 text-orange-100"
              >
                Track.
              </span>

              <span className="relative bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 to-orange-600">
                Track.
              </span>

              <br />

              <span
                aria-hidden
                className="absolute transform translate-x-2 translate-y-2 text-purple-300"
              >
                Organize.
              </span>

              <span
                aria-hidden
                className="absolute transform translate-x-1 translate-y-1 text-purple-100"
              >
                Organize.
              </span>

              <span className="relative bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-500 to-purple-600">
                Organize.
              </span>

              <br />

              <span
                aria-hidden
                className="absolute transform translate-x-2 translate-y-2 text-pink-300"
              >
                Share.
              </span>

              <span
                aria-hidden
                className="absolute transform translate-x-1 translate-y-1 text-pink-100"
              >
                Share.
              </span>

              <span className="relative bg-clip-text text-transparent bg-gradient-to-br from-pink-500 to-rose-500">
                Share.
              </span>
            </h1>

            <p className="max-w-screen-lg text-md sm:text-2xl sm:leading-10 font-medium text-gray-500">
              With GitReads you can{" "}
              <b className="text-gray-800 font-bold">collect and showcase books you read</b> by
              using a Git repository.
            </p>

            <div className="flex flex-wrap text-center my-12">
              <Link href={isLoading ? "/" : user ? appRoute : signupUrl}>
                <a className="w-full sm:w-auto flex-none btn-retro text-lg">Git started</a>
              </Link>
            </div>
          </div>
        </main>

        <footer className="bg-gray-800 py-8">
          <div className="page-container">
            <div className="flex flex-wrap items-center space-x-3">
              <a
                href="https://github.com/gitreads"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>

              <a
                href="https://blog.danillouz.dev"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </a>

              <a
                href="https://danillouz.dev"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>

              <a
                href="https://twitter.com/danillouz"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>

            <p data-testid="copyright" className="mt-2 px-3 py-2 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} GitReads
            </p>
          </div>
        </footer>
      </div>
    </Page>
  )
}

export default Home
