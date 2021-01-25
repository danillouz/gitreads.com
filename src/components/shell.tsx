import { useState } from "react"
import Link from "next/link"
import clsx from "clsx"
import { useSession, useLoginIsRequired } from "@lib/auth0"
import { appRoute, loginUrl, signupUrl, logoutUrl } from "@config/auth"
import Page from "@components/page"
import { Logo } from "@components/logo"
import { Nav, NavLink } from "@components/nav"
import {
  MobileMenu,
  MobileMenuButton,
  MobileMenuNav,
  MobileMenuNavLink,
  MobileMenuUserInfo,
} from "@components/mobile-menu"
import { UserMenu, UserMenuItem } from "@components/user-menu"
import { Footer, FooterLink } from "@components/footer"

type LogoLinkProps = {
  gradientId: string
  href: string
}

const LogoLink = (props: LogoLinkProps): JSX.Element => {
  return (
    <>
      <span className="sr-only">GitReads</span>

      <Link href={props.href}>
        <a className="flex items-center justify-center bg-gray-800 rounded-full shadow-sm w-14 h-14 focus:outline-white">
          <Logo gradientId={props.gradientId} />
        </a>
      </Link>
    </>
  )
}

type ShellProps = {
  children?: React.ReactNode
}

export const HomeShell = (props: ShellProps): JSX.Element => {
  const { user, isLoading } = useSession()

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false)
  const handleMenuButtonClick = () => setMobileMenuIsOpen((isOpen) => !isOpen)

  return (
    <Page title="GitReads">
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-10">
          <div className="px-0 mx-auto page-container sm:px-4">
            <div className="flex items-center justify-between h-20 px-4 bg-gray-700 shadow-lg md:space-x-4 sm:rounded-full sm:bg-opacity-95 sm:mt-4">
              <div className="hidden sm:flex lg:flex-1">
                {user ? (
                  <UserMenu
                    isDisabled={isLoading}
                    avatar={user.avatar}
                    name={user.name}
                    email={user.email}
                  >
                    <UserMenuItem href={logoutUrl}>Logout</UserMenuItem>
                  </UserMenu>
                ) : (
                  <LogoLink gradientId="gr_id_1" href="/" />
                )}
              </div>

              <div className="sm:hidden">
                <LogoLink gradientId="gr_id_2" href="/" />
              </div>

              <div
                className={clsx("-mr-2 -my-2 sm:hidden transition-opacity duration-200", {
                  "opacity-0": isLoading,
                  "opacity-100": !isLoading,
                })}
              >
                <MobileMenuButton
                  isDisabled={isLoading}
                  isOpen={mobileMenuIsOpen}
                  handleMenuButtonClick={handleMenuButtonClick}
                />
              </div>

              <Nav>
                {/* 
                  Main nav, for example:
                  
                  <NavLink href="/product">Product</NavLink>
                  <NavLink href="/pricing">Pricing</NavLink>
                  <NavLink href="/docs">Docs</NavLink>
                */}
              </Nav>

              <div className="items-center justify-end hidden space-x-2 sm:flex sm:flex-1">
                {!isLoading && (
                  <>
                    {user ? (
                      <NavLink href={appRoute}>Dashboard</NavLink>
                    ) : (
                      <>
                        <NavLink href={loginUrl}>Login</NavLink>

                        <Link href={signupUrl}>
                          <a className="text-white rounded-full shadow-sm btn btn-sm purple-gradient hover:shadow-purple-blur focus:outline-white">
                            Signup
                          </a>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {!isLoading && (
          <MobileMenu isOpen={mobileMenuIsOpen}>
            <div className="px-4 py-5">
              <MobileMenuNav>
                {/*
                Main nav, for example:

                <MobileMenuNavLink href="/product">Product</MobileMenuNavLink>
                <MobileMenuNavLink href="/pricing">Pricing</MobileMenuNavLink>
                <MobileMenuNavLink href="/docs">Docs</MobileMenuNavLink>
              */}
              </MobileMenuNav>
            </div>

            <div className="px-4 py-6 space-y-6">
              {user ? (
                <>
                  <MobileMenuUserInfo avatar={user.avatar} name={user.name} email={user.email} />

                  <div className="grid gap-y-6">
                    <MobileMenuNavLink href={appRoute}>Dashboard</MobileMenuNavLink>
                    <MobileMenuNavLink href={logoutUrl}>Logout</MobileMenuNavLink>
                  </div>
                </>
              ) : (
                <div>
                  <Link href={signupUrl}>
                    <a className="flex items-center justify-center w-full text-white rounded-full shadow-sm btn purple-gradient focus:outline-white">
                      Signup
                    </a>
                  </Link>

                  <p className="mt-6 text-base antialiased font-medium text-center">
                    <Link href={loginUrl}>
                      <a className="font-semibold text-white focus:outline-white">
                        <span className="font-normal text-gray-300">Already have an account?</span>{" "}
                        Login
                      </a>
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </MobileMenu>
        )}

        <main className="flex-1">{props.children}</main>

        <Footer>
          <FooterLink href="https://github.com/gitreads" external>
            GitHub
          </FooterLink>

          <FooterLink href="https://danillouz.dev" external>
            About
          </FooterLink>
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

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false)
  const handleMenuButtonClick = () => setMobileMenuIsOpen((isOpen) => !isOpen)

  return (
    <Page title="App - GitReads">
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-10">
          <div className="px-0 mx-auto page-container sm:px-4">
            <div className="flex items-center justify-between h-20 px-4 space-x-4 bg-gray-700 shadow-lg sm:justify-start sm:rounded-full sm:bg-opacity-95 sm:mt-4">
              <div className="hidden sm:flex">
                <UserMenu
                  isDisabled={!hasSession}
                  avatar={user?.avatar}
                  name={user?.name}
                  email={user?.email}
                >
                  <UserMenuItem href={logoutUrl}>Logout</UserMenuItem>
                </UserMenu>
              </div>

              <div className="sm:hidden">
                <LogoLink gradientId="gr_id_3" href={appRoute} />
              </div>

              <div
                className={clsx("-mr-2 -my-2 sm:hidden transition-opacity duration-200", {
                  "opacity-0": !hasSession,
                  "opacity-100": hasSession,
                })}
              >
                <MobileMenuButton
                  isDisabled={!hasSession}
                  isOpen={mobileMenuIsOpen}
                  handleMenuButtonClick={handleMenuButtonClick}
                />
              </div>

              <Nav>
                <NavLink href={appRoute}>Dashboard</NavLink>
                <NavLink href={`${appRoute}/books`}>Books</NavLink>
                <NavLink href={`${appRoute}/libraries`}>Libraries</NavLink>
              </Nav>
            </div>
          </div>
        </header>

        {hasSession && (
          <MobileMenu isOpen={mobileMenuIsOpen}>
            <div className="px-4 py-5">
              <MobileMenuNav>
                <MobileMenuNavLink href={appRoute}>Dashboard</MobileMenuNavLink>
                <MobileMenuNavLink href={`${appRoute}/books`}>Books</MobileMenuNavLink>
                <MobileMenuNavLink href={`${appRoute}/libraries`}>Libraries</MobileMenuNavLink>
              </MobileMenuNav>
            </div>

            <div className="px-4 py-6 space-y-6">
              <MobileMenuUserInfo avatar={user.avatar} name={user.name} email={user.email} />

              <div className="grid gap-y-6">
                <MobileMenuNavLink href={logoutUrl}>Logout</MobileMenuNavLink>
              </div>
            </div>
          </MobileMenu>
        )}

        <main className="flex-1">{props.children}</main>

        <Footer>
          <FooterLink href="/">Homepage</FooterLink>

          <FooterLink href="https://github.com/gitreads" external>
            GitHub
          </FooterLink>

          <FooterLink href="https://danillouz.dev" external>
            About
          </FooterLink>
        </Footer>
      </div>
    </Page>
  )
}
