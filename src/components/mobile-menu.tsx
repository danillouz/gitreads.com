import Link from "next/link"
import { Transition } from "@headlessui/react"
import Avatar from "@components/avatar"
import { useEffect } from "react"

type MenuButtonProps = {
  isDisabled: boolean
  isOpen: boolean
  handleMenuButtonClick(event: React.MouseEvent<HTMLButtonElement>): void
}

export const MobileMenuButton = (props: MenuButtonProps): JSX.Element => {
  return (
    <button
      disabled={props.isDisabled}
      className="inline-flex items-center justify-center p-2 text-gray-400 focus:outline-white"
      aria-label="Open menu"
      onClick={props.handleMenuButtonClick}
    >
      <svg className="block w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {props.isOpen ? (
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
  )
}

type MobileMenuProps = {
  isOpen
  children?: React.ReactNode
}

export const MobileMenu = (props: MobileMenuProps): JSX.Element => {
  const { isOpen } = props

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open")
    } else {
      document.body.classList.remove("menu-open")
    }
  })

  return (
    <Transition
      show={isOpen}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
      className="fixed inset-x-0 bottom-0 z-20 transition origin-top-right transform top-20 md:hidden"
    >
      <div className="h-full bg-gray-700 divide-y divide-gray-600">{props.children}</div>
    </Transition>
  )
}

type MobileMenuNavProps = {
  children?: React.ReactNode
}

export const MobileMenuNav = (props: MobileMenuNavProps): JSX.Element => {
  return <nav className="grid gap-y-6">{props.children}</nav>
}

type MobileMenuNavLinkProps = {
  href: string
  children: React.ReactNode
}

export const MobileMenuNavLink = (props: MobileMenuNavLinkProps): JSX.Element => {
  return (
    <Link href={props.href}>
      <a className="block p-3 -m-3 antialiased text-gray-300 focus:outline-white">
        {props.children}
      </a>
    </Link>
  )
}

type UserInfoProps = {
  avatar: string
  name?: string
  email?: string
}

export const MobileMenuUserInfo = (props: UserInfoProps): JSX.Element => {
  const { name = "Anonymous", email = "no email address" } = props

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center">
        <Avatar src={props.avatar} />
      </div>

      <div>
        <div className="antialiased text-gray-300">{name}</div>
        <div className="antialiased text-gray-400">{email}</div>
      </div>
    </div>
  )
}
