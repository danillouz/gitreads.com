import Link from "next/link"
import { useState } from "react"
import clsx from "clsx"
import useOutsideClicks from "@hooks/use-outside-clicks"
import Avatar from "@components/avatar"

type UserMenuProps = {
  avatar?: string
  name?: string
  email?: string
  isDisabled: boolean
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
          disabled={props.isDisabled}
          className="flex items-center max-w-xs transition duration-200 rounded-full focus:outline-white"
          aria-label="Open user menu"
          aria-haspopup="true"
          onClick={onClickBtn}
        >
          <Avatar src={avatar} />
        </button>

        <div
          className={clsx("origin-top-left absolute left-7 mt-1 w-48", {
            block: isOpen,
            hidden: !isOpen,
          })}
        >
          <div
            className="py-2 space-y-1 bg-gray-600 rounded-lg shadow-xl"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <div className="block px-4 py-2 border-b border-gray-500">
              <div className="antialiased text-gray-300">{name}</div>
              <div className="antialiased text-gray-400">{email}</div>
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
      <a className="block px-4 py-2 antialiased font-medium text-gray-300 transition-colors duration-200 hover:bg-gray-500 hover:text-white focus:outline-white">
        {props.children}
      </a>
    </Link>
  )
}
