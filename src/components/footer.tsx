import Link from "next/link"

import { ThemeDropdown } from "@components/theme-dropdown"

type FooterProps = {
  children?: React.ReactNode
}

export const Footer = (props: FooterProps): JSX.Element => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-700 border-t border-gray-300 dark:border-gray-600">
      <div className="page-container mx-auto px-4 py-10">
        <div className="flex flex-col justify-center space-y-8 md:space-y-0 md:flex-row md:justify-between">
          <div className="flex flex-col items-center justify-center space-y-2 md:space-y-0 md:flex-row md:-mx-3 md:space-x-3">
            {props.children}
          </div>

          <div
            data-testid="copyright"
            className="flex items-center self-center justify-center text-sm dark:antialiased text-center text-gray-500 dark:text-gray-400 md:self-auto"
          >
            Copyright &copy; {new Date().getFullYear()} GitReads
          </div>
        </div>

        <ThemeDropdown />
      </div>
    </footer>
  )
}

type FooterLinkProps = {
  href: string
  children: React.ReactNode
  external?: boolean
}

export const FooterLink = (props: FooterLinkProps): JSX.Element => {
  const className =
    "flex items-center justify-center w-full px-3 py-2 text-base dark:antialiased text-gray-500 dark:text-gray-400 transition-colors duration-200 rounded-lg hover:text-gray-800 dark:hover:text-gray-50 focus:outline-black dark:focus:outline-white"

  if (props.external) {
    return (
      <a href={props.href} className={className} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    )
  }

  return (
    <Link href={props.href}>
      <a className={className}>{props.children}</a>
    </Link>
  )
}
