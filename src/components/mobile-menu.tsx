import Link from "next/link"
import { Transition } from "@headlessui/react"

import Avatar from "@components/avatar"

type MenuButtonProps = {
  isDisabled: boolean
  handleMenuButtonClick(event: React.MouseEvent<HTMLButtonElement>): void
}

export const MobileMenuButton = (props: MenuButtonProps): JSX.Element => {
  return (
    <button
      disabled={props.isDisabled}
      className="inline-flex items-center justify-center p-2 text-gray-400 focus:outline-black dark:focus:outline-white"
      aria-label="Open menu"
      onClick={props.handleMenuButtonClick}
    >
      <svg className="block w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
      </svg>
    </button>
  )
}

export const MobileMenuButtonClose = (props: MenuButtonProps): JSX.Element => {
  return (
    <button
      disabled={props.isDisabled}
      className="inline-flex items-center justify-center p-2 text-gray-400 focus:outline-black dark:focus:outline-white"
      aria-label="Open menu"
      onClick={props.handleMenuButtonClick}
    >
      <svg className="block w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M6 18L18 6M6 6l12 12"
        />
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

  return (
    <Transition
      show={isOpen}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
      className="fixed inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
    >
      <div className="h-full rounded-md shadow-md bg-white dark:bg-gray-600 divide-y divide-gray-200 dark:divide-gray-500 border border-gray-200 dark:border-gray-500">
        {props.children}
      </div>
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
      <a className="block p-3 -m-3 text-gray-800 dark:text-gray-50 dark:antialiased focus:outline-white">
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
        <Avatar className="w-12 h-12" src={props.avatar} />
      </div>

      <div className="text-gray-500 dark:text-gray-300 dark:antialiased">
        <p className="mb-1 leading-5 truncate" title={name}>
          {name}
        </p>

        <p className="leading-5 truncate" title={email}>
          {email}
        </p>
      </div>
    </div>
  )
}
