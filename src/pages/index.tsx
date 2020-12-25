import { useState } from "react"
import Link from "next/link"
import { UseFetchSessionParams, useFetchSession } from "@lib/auth0"
import Page from "@components/page"
import Logo from "@components/logo"
import { Nav, MenuButton, MenuContainer } from "@components/nav"
import { UserMenu, UserMenuItem, MobileUserMenu, MobileUserMenuItem } from "@components/user-menu"
import Footer from "@components/footer"

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

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

  return (
    <Page title="Home - GitReads">
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 bg-gray-800">
          <div className="page-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Logo href="/" />
                </div>
              </div>

              <Nav />

              <div className="flex items-center -mr-2 md:hidden">
                {!isLoading && <MenuButton isOpen={menuIsOpen} onMenuClick={handleMenuClick} />}
              </div>

              {!isLoading && (
                <div className="hidden md:block">
                  {user ? (
                    <div className="flex items-center space-x-3">
                      <Link href={appRoute}>
                        <a className="nav-link">App</a>
                      </Link>

                      <UserMenu avatar={user.avatar} name={user.name} email={user.email}>
                        <UserMenuItem href={logoutUrl}>Logout</UserMenuItem>
                      </UserMenu>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Link href={loginUrl}>
                        <a className="nav-link">Login</a>
                      </Link>

                      <Link href={signupUrl}>
                        <a className="nav-link-cta">Signup</a>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {!isLoading && (
          <MenuContainer isOpen={menuIsOpen}>
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
          </MenuContainer>
        )}

        <main className="flex-1">
          <div className="page-container">
            <h1 data-testid="hero" className="hero">
              <span className="text-orange-gradient">Track.</span>
              <br />
              <span className="text-purple-gradient">Organize.</span>
              <br />
              <span className="text-pink-gradient">Share.</span>
            </h1>

            <p className="max-w-screen-lg text-md sm:text-2xl sm:leading-10 font-medium text-gray-500">
              With GitReads you can{" "}
              <b className="text-gray-800 font-bold">collect and showcase books you read</b> by
              using a Git repository.
            </p>

            <div className="flex flex-wrap items-center text-center my-12">
              <Link href={isLoading ? "/" : user ? appRoute : signupUrl}>
                <a className="w-full sm:w-auto flex-none btn-retro text-lg">Git started</a>
              </Link>
            </div>
          </div>
        </main>

        <Footer>
          <a
            href="https://github.com/gitreads"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://danillouz.dev"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </a>
        </Footer>
      </div>
    </Page>
  )
}

export default Home
