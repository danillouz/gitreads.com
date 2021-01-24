import Link from "next/link"
import { useRouter } from "next/router"
import clsx from "clsx"

type NavProps = {
  className?: string
  children?: React.ReactNode
}

export const Nav = (props: NavProps): JSX.Element => {
  return (
    <nav className={clsx("items-center hidden space-x-2 sm:flex", props.className)}>
      {props.children}
    </nav>
  )
}

type NavLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export const NavLink = (props: NavLinkProps): JSX.Element => {
  const { href, children, className } = props

  const router = useRouter()
  const isActive = router?.pathname === href

  return (
    <Link href={href}>
      <a
        className={clsx(
          "px-4 py-2 antialiased leading-6 tracking-wider transition duration-200 rounded-full hover:text-white focus:outline-white",
          {
            "text-white bg-gray-900": isActive,
            "text-gray-300": !isActive,
          },
          className
        )}
      >
        {children}
      </a>
    </Link>
  )
}
