import Link from "next/link"
import { Menu, Transition } from "@headlessui/react"
import clsx from "clsx"
import Avatar from "@components/avatar"

type UserDropdownProps = {
  avatarUrl?: string
  name?: string
  email?: string
  isDisabled: boolean
  children: React.ReactNode
}

export const UserDropdown = (props: UserDropdownProps): JSX.Element => {
  const { avatarUrl, name = "Anonymous", email = "no email address", children } = props

  return (
    <div className="flex items-center">
      <div className="relative">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button
                disabled={props.isDisabled}
                className="flex items-center w-full transition duration-150 ease-in-out rounded-full focus:outline-white"
              >
                <Avatar className="w-14 h-14" src={avatarUrl} />
              </Menu.Button>

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute w-56 mt-2 origin-top-left bg-gray-600 divide-y divide-gray-500 rounded-lg shadow-xl outline-none left-7"
                >
                  <div className="px-4 py-3">
                    <p
                      className="text-sm antialiased leading-5 text-gray-300 truncate"
                      title={name}
                    >
                      {name}
                    </p>

                    <p
                      className="text-sm antialiased leading-5 text-gray-400 truncate"
                      title={email}
                    >
                      {email}
                    </p>
                  </div>

                  <div className="py-2">{children}</div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  )
}

type UserDropdownLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export const UserDropdownLink = (props: UserDropdownLinkProps): JSX.Element => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link href={props.href}>
          <a
            className={clsx(
              "flex justify-between w-full px-4 py-2 text-sm text-gray-300 leading-5 antialiased hover:text-white hover:bg-gray-500",
              {
                "bg-gray-500 text-white": active,
              },
              props.className
            )}
          >
            {props.children}
          </a>
        </Link>
      )}
    </Menu.Item>
  )
}
