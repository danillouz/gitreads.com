import Link from "next/link"
import clsx from "clsx"
import { ReactNode } from "react"

type HeaderProps = {
  isLoading: boolean
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
}

export const Header = (props: HeaderProps): JSX.Element => {
  const { isLoading } = props

  return (
    <div className="pb-20 bg-gray-800">
      <div
        className={clsx("container mx-auto px-6", {
          "animate-pulse": isLoading,
        })}
      >
        <div className="flex items-center h-14">
          {isLoading ? (
            <div
              data-testid="skeleton"
              className="w-3/12 h-5 bg-gray-400 rounded md:w-2/12 lg:w-1/12"
            ></div>
          ) : (
            <span className="-mx-3 link"></span>
          )}
        </div>

        {isLoading ? (
          <div
            data-testid="skeleton"
            className="w-2/5 bg-gray-400 rounded h-9 sm:h-10 md:w-1/4 lg:w-1/5"
          ></div>
        ) : (
          <h1 className="text-3xl tracking-wide text-white sm:text-4xl">{props.title}</h1>
        )}
        {isLoading ? (
          <div
            data-testid="skeleton"
            className="w-4/5 my-2 bg-gray-400 rounded h-7 md:w-2/4 lg:w-2/5"
          ></div>
        ) : (
          <h2 className="my-2 text-xl tracking-wide text-gray-300">{props.subtitle}</h2>
        )}
      </div>
    </div>
  )
}

type ContainerProps = {
  className?: string
  children: React.ReactNode
}

export const Container = (props: ContainerProps): JSX.Element => {
  return (
    <div className={clsx("page-container transform -translate-y-14", props.className)}>
      {props.children}
    </div>
  )
}

type SectionProps = {
  className?: string
  children: React.ReactNode
}

export const PageSection = (props: SectionProps): JSX.Element => {
  return (
    <section className={clsx("bg-white rounded-lg shadow-md", props.className)}>
      {props.children}
    </section>
  )
}

type SectionTitleProps = {
  className?: string
  children: React.ReactNode
}

export const SectionTitle = (props: SectionTitleProps): JSX.Element => {
  return (
    <h3
      className={clsx(
        "flex items-center space-x-2 pb-2 text-2xl border-b border-gray-100",
        props.className
      )}
    >
      {props.children}
    </h3>
  )
}

type ActionProps = {
  isLoading: boolean
  href: string
  className?: string
  icon: React.ReactNode
  name: string | ReactNode
}

export const Action = (props: ActionProps): JSX.Element => {
  const { isLoading, icon, name } = props

  const className = clsx(
    "flex sm:flex-col items-center sm:justify-center sm:mt-2 sm:mr-6 mb-3 sm:mb-2 px-5 sm:px-2 py-5 w-full sm:w-40 h-18 sm:h-30 space-x-3 sm:space-x-0 sm:space-y-1 font-medium text-lg sm:text-base text-gray-50 tracking-wider rounded-lg shadow-md transform-gpu transition duration-200",
    props.className,
    {
      "cursor-not-allowed": isLoading,
      "hover:text-white hover:scale-105 hover:shadow-lg focus:outline-none focus:text-white focus:scale-105 focus:shadow-lg": !isLoading,
    }
  )

  if (isLoading) {
    return (
      <span className={className}>
        {icon} <span>{name}</span>
      </span>
    )
  }

  return (
    <Link href={props.href}>
      <a className={className}>
        {icon} <span>{name}</span>
      </a>
    </Link>
  )
}
