import { useState } from "react"
import { useUser } from "@auth0/nextjs-auth0"
import Link from "next/link"
import clsx from "clsx"

import { useLoginIsRequired } from "@lib/auth0"
import { dashboardRoute, loginUrl, signupUrl, logoutUrl } from "@config/auth"
import Page from "@components/page"
import { Nav, NavLink } from "@components/nav"
import {
  MobileMenu,
  MobileMenuButton,
  MobileMenuButtonClose,
  MobileMenuNav,
  MobileMenuNavLink,
  MobileMenuUserInfo,
} from "@components/mobile-menu"
import { UserDropdown, UserDropdownLink } from "@components/user-dropdown"
import { Footer, FooterLink } from "@components/footer"

type ShellProps = {
  children?: React.ReactNode
}

export const HomeShell = (props: ShellProps): JSX.Element => {
  const { user, isLoading } = useUser()

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false)
  const handleMenuButtonOpen = () => setMobileMenuIsOpen(true)
  const handleMenuButtonClose = () => setMobileMenuIsOpen(false)

  return (
    <Page title="GitReads">
      <div className="flex flex-col min-h-screen">
        <header>
          <div className="page-container mx-auto px-4">
            <div className="flex items-center justify-end sm:justify-between h-20 border-b border-gray-200 dark:border-gray-700">
              <Nav>
                <NavLink href="/">Home</NavLink>
              </Nav>

              <div className="items-center justify-end hidden space-x-2 sm:flex sm:flex-1">
                {!isLoading && (
                  <>
                    {user ? (
                      <UserDropdown
                        isDisabled={isLoading}
                        avatarUrl={user.picture}
                        name={user.name}
                        email={user.email}
                      >
                        {user && (
                          <UserDropdownLink href={dashboardRoute}>Dashboard</UserDropdownLink>
                        )}
                        <UserDropdownLink href={logoutUrl}>Logout</UserDropdownLink>
                      </UserDropdown>
                    ) : (
                      <>
                        <NavLink
                          className="font-medium text-gray-800 hover:text-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                          href={loginUrl}
                        >
                          Log in
                        </NavLink>

                        <Link href={signupUrl}>
                          <a className="btn btn-sm rounded-full text-gray-50 dark:text-gray-800 dark:antialiased bg-gray-800 dark:bg-gray-50 focus:outline-black dark:focus:outline-white">
                            Sign up
                          </a>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>

              <div
                className={clsx("-mr-2 -my-2 sm:hidden transition-opacity duration-200", {
                  "opacity-0": isLoading,
                  "opacity-100": !isLoading,
                })}
              >
                <MobileMenuButton
                  isDisabled={isLoading || mobileMenuIsOpen}
                  handleMenuButtonClick={handleMenuButtonOpen}
                />
              </div>
            </div>
          </div>
        </header>

        {!isLoading && (
          <MobileMenu isOpen={mobileMenuIsOpen}>
            <div className="py-6 px-5">
              <div className="flex items-center justify-between">
                <div></div>

                <div className="-mr-2">
                  <MobileMenuButtonClose
                    isDisabled={isLoading || !mobileMenuIsOpen}
                    handleMenuButtonClick={handleMenuButtonClose}
                  />
                </div>
              </div>

              <div className="mt-5">
                <MobileMenuNav>
                  <MobileMenuNavLink href="/">Home</MobileMenuNavLink>
                </MobileMenuNav>
              </div>
            </div>

            <div className="py-6 px-5 space-y-6">
              {user ? (
                <>
                  <MobileMenuUserInfo avatar={user.picture} name={user.name} email={user.email} />

                  <div className="grid gap-y-6">
                    <MobileMenuNavLink href={dashboardRoute}>Dashboard</MobileMenuNavLink>
                    <MobileMenuNavLink href={logoutUrl}>Logout</MobileMenuNavLink>
                  </div>
                </>
              ) : (
                <div>
                  <Link href={signupUrl}>
                    <a className="flex items-center justify-center w-full btn rounded-full text-gray-50 bg-gray-800 dark:text-gray-800 dark:bg-gray-50 focus:outline-black dark:focus:outline-white">
                      Sign up
                    </a>
                  </Link>

                  <p className="mt-6 text-base antialiased font-medium text-center">
                    <Link href={loginUrl}>
                      <a className="font-semibold text-gray-800 dark:text-gray-50 focus:outline-black dark:focus:outline-white">
                        <span className="font-normal text-gray-500 dark:text-gray-400">
                          Already have an account?
                        </span>{" "}
                        Log in
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
  const { user, isLoading } = useUser()

  useLoginIsRequired({ user, isLoading })

  const hasSession = !isLoading && Boolean(user)

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false)
  const handleMenuButtonOpen = () => setMobileMenuIsOpen(true)
  const handleMenuButtonClose = () => setMobileMenuIsOpen(false)

  return (
    <Page title="App - GitReads">
      <div className="flex flex-col min-h-screen">
        <header>
          <div className="page-container mx-auto px-4">
            <div className="flex items-center justify-end sm:justify-between h-20 sm:justify-start border-b border-gray-200 dark:border-gray-700">
              <Nav>
                <NavLink href={dashboardRoute}>Dashboard</NavLink>
                <NavLink href={`${dashboardRoute}/books`}>Books</NavLink>
                <NavLink href={`${dashboardRoute}/libraries`}>Libraries</NavLink>
              </Nav>

              <div className="items-center justify-end hidden space-x-2 sm:flex sm:flex-1">
                <UserDropdown
                  isDisabled={!hasSession}
                  avatarUrl={user?.picture}
                  name={user?.name}
                  email={user?.email}
                >
                  <UserDropdownLink href={logoutUrl}>Logout</UserDropdownLink>
                </UserDropdown>
              </div>

              <div
                className={clsx("-mr-2 -my-2 sm:hidden transition-opacity duration-200", {
                  "opacity-0": isLoading,
                  "opacity-100": !isLoading,
                })}
              >
                <MobileMenuButton
                  isDisabled={isLoading || mobileMenuIsOpen}
                  handleMenuButtonClick={handleMenuButtonOpen}
                />
              </div>
            </div>
          </div>
        </header>

        {hasSession && (
          <MobileMenu isOpen={mobileMenuIsOpen}>
            <div className="py-6 px-5">
              <div className="flex items-center justify-between">
                <div></div>

                <div className="-mr-2">
                  <MobileMenuButtonClose
                    isDisabled={isLoading || !mobileMenuIsOpen}
                    handleMenuButtonClick={handleMenuButtonClose}
                  />
                </div>
              </div>

              <div className="mt-5">
                <MobileMenuNav>
                  <MobileMenuNavLink href={dashboardRoute}>Dashboard</MobileMenuNavLink>
                  <MobileMenuNavLink href={`${dashboardRoute}/books`}>Books</MobileMenuNavLink>
                  <MobileMenuNavLink href={`${dashboardRoute}/libraries`}>
                    Libraries
                  </MobileMenuNavLink>
                </MobileMenuNav>
              </div>
            </div>

            <div className="py-6 px-5 space-y-6">
              <MobileMenuUserInfo avatar={user.picture} name={user.name} email={user.email} />

              <div className="grid gap-y-6">
                <MobileMenuNavLink href={logoutUrl}>Logout</MobileMenuNavLink>
              </div>
            </div>
          </MobileMenu>
        )}

        <main className="flex-1">{props.children}</main>

        <Footer>
          <FooterLink href="/">Home</FooterLink>

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
