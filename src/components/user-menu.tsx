import Link from "next/link"
import { useState } from "react"
import classnames from "classnames"
import useOutsideClicks from "@hooks/use-outside-clicks"
import Avatar from "@components/avatar"

type UserMenuProps = {
  avatar?: string
  name?: string
  email?: string
  children: React.ReactNode
}

export const UserMenu = (props: UserMenuProps): JSX.Element => {
  const { avatar, name = "Anonymous", email = "no email address", children } = props

  const [isOpen, setIsOpen] = useState(false)
  const onClickBtn = () => setIsOpen(!isOpen)
  const handleClose = () => setIsOpen(false)
  const [dropdownEl] = useOutsideClicks(handleClose)

  return (
    <div className="flex items-center" ref={dropdownEl}>
      <div className="relative">
        <button
          className="max-w-xs flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          aria-label="Open user menu"
          aria-haspopup="true"
          onClick={onClickBtn}
        >
          <Avatar src={avatar} />
        </button>

        <div
          className={classnames(
            "origin-top-right absolute right-5 mt-1 w-48 rounded-lg shadow-xl",
            {
              block: isOpen,
              hidden: !isOpen,
            }
          )}
        >
          <div
            className="py-2 rounded-lg bg-white shadow-lg space-y-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <div className="block px-4 py-2 border-b border-gray-100" role="menuitem">
              <div className="text-base text-gray-800">{name}</div>
              <div className="text-sm text-gray-500">{email}</div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

type UserMenuItemProps = {
  href: string
  children: React.ReactNode
}

export const UserMenuItem = (props: UserMenuItemProps): JSX.Element => {
  return (
    <Link href={props.href}>
      <a
        className="block px-4 py-2 text-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-200"
        role="menuitem"
      >
        {props.children}
      </a>
    </Link>
  )
}

type MobileUserMenuProps = {
  avatar: string
  name?: string
  email?: string
  children: React.ReactNode
}

export const MobileUserMenu = (props: MobileUserMenuProps): JSX.Element => {
  const { name = "Anonymous", email = "no email address" } = props

  return (
    <div className="px-3 py-5">
      <div className="flex items-center px-3 space-x-3">
        <div className="flex-shrink-0">
          <Avatar src={props.avatar} />
        </div>

        <div className="space-y-1">
          <div className="text-base font-medium leading-none text-white antialiased">{name}</div>
          <div className="text-sm font-medium leading-none text-gray-400 antialiased">{email}</div>
        </div>
      </div>

      <div className="mt-3 space-y-1">{props.children}</div>
    </div>
  )
}

type MobileUserMenuItemProps = {
  href: string
  children: React.ReactNode
}

export const MobileUserMenuItem = (props: MobileUserMenuItemProps): JSX.Element => {
  return (
    <Link href={props.href}>
      <a className="nav-link" role="menuitem">
        {props.children}
      </a>
    </Link>
  )
}
