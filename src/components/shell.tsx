import { useState } from "react"
import Link from "next/link"
import classnames from "classnames"
import { useSession, useLoginIsRequired } from "@lib/auth0"
import Page from "@components/page"
import { LogoWithName, Logo } from "@components/logo"
import { Nav, MobileNav, NavItem, MenuButton, MenuContainer } from "@components/nav"
import { UserMenu, UserMenuItem, MobileUserMenu, MobileUserMenuItem } from "@components/user-menu"
import Footer from "@components/footer"

const apiBase = "/api/auth"
const appRoute = "/app"
const loginUrl = `${apiBase}/login?redirectTo=${encodeURIComponent(appRoute)}`
const signupUrl = `${apiBase}/login?signup=true&redirectTo=${encodeURIComponent(appRoute)}`
const logoutUrl = `${apiBase}/logout`

type ShellProps = {
  children?: React.ReactNode
}

export const HomeShell = (props: ShellProps): JSX.Element => {
  const { user, isLoading } = useSession()

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

  return (
    <Page title="Home - GitReads">
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700">
          <div className="page-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <LogoWithName href="/" />
                </div>
              </div>

              <Nav />

              <div
                className={classnames(
                  "flex items-center -mr-2 md:hidden transition-opacity duration-200",
                  {
                    "opacity-0": isLoading,
                    "opacity-100": !isLoading,
                  }
                )}
              >
                <MenuButton
                  isLoading={isLoading}
                  isOpen={menuIsOpen}
                  onMenuClick={handleMenuClick}
                />
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
              <>
                <MobileNav>
                  <NavItem href={appRoute}>App</NavItem>
                </MobileNav>

                <MobileUserMenu avatar={user.avatar} name={user.name} email={user.email}>
                  <MobileUserMenuItem href={logoutUrl}>Logout</MobileUserMenuItem>
                </MobileUserMenu>
              </>
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

        <main className="flex-1">{props.children}</main>

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

export const AppShell = (props: ShellProps): JSX.Element => {
  const session = useSession()

  useLoginIsRequired(session)

  const { user, isLoading } = session
  const hasSession = !isLoading && Boolean(user)

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

  return (
    <Page title="App - GitReads">
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700">
          <div className="page-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <Logo href="/app" />
                </div>

                {hasSession && (
                  <Nav>
                    <NavItem href="/books">Books</NavItem>
                    <NavItem href="/libraries">Libraries</NavItem>
                  </Nav>
                )}
              </div>

              <div
                className={classnames(
                  "flex items-center -mr-2 md:hidden transition-opacity duration-200",
                  {
                    "opacity-0": !hasSession,
                    "opacity-100": hasSession,
                  }
                )}
              >
                <MenuButton
                  isLoading={!hasSession}
                  isOpen={menuIsOpen}
                  onMenuClick={handleMenuClick}
                />
              </div>

              {hasSession && (
                <div className="hidden md:block">
                  <UserMenu avatar={user.avatar} name={user.name} email={user.email}>
                    <UserMenuItem href={logoutUrl}>Logout</UserMenuItem>
                  </UserMenu>
                </div>
              )}
            </div>
          </div>
        </header>

        {hasSession && (
          <MenuContainer isOpen={menuIsOpen}>
            <MobileNav>
              <NavItem href="/books">Books</NavItem>
              <NavItem href="/libraries">Libraries</NavItem>
            </MobileNav>

            <MobileUserMenu avatar={user.avatar} name={user.name} email={user.email}>
              <MobileUserMenuItem href={logoutUrl}>Logout</MobileUserMenuItem>
            </MobileUserMenu>
          </MenuContainer>
        )}

        <main className="flex-1">{props.children}</main>

        <Footer>
          <Link href="/">
            <a className="footer-link">Home</a>
          </Link>

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
