import clsx from "clsx"

type ContentContainerProps = {
  children: React.ReactNode
  className?: string
}

export const ContentContainer = (props: ContentContainerProps): JSX.Element => {
  return (
    <div className={clsx("page-container mx-auto px-4", props.className)}>{props.children}</div>
  )
}

type ContentHeaderProps = {
  isLoading: boolean
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
}

export const ContentHeader = (props: ContentHeaderProps): JSX.Element => {
  const { isLoading } = props

  return (
    <div
      className={clsx({
        "animate-pulse": isLoading,
      })}
    >
      <div className="flex items-center h-14">
        {isLoading ? (
          <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
        ) : (
          <span className="-mx-3 link"></span>
        )}
      </div>

      {isLoading ? (
        <div className="w-80 bg-gray-200 dark:bg-gray-700 rounded h-9 sm:h-10" />
      ) : (
        <h1
          data-testid="content-header"
          className="text-3xl tracking-wide text-gray-800 dark:text-gray-50 dark:antialiased sm:text-4xl"
        >
          {props.title}
        </h1>
      )}

      {isLoading ? (
        <div className="w-48 my-2 bg-gray-200 dark:bg-gray-700 rounded h-7" />
      ) : (
        <h2
          data-testid="content-subtitle"
          className="my-2 text-xl tracking-wide text-gray-500 dark:text-gray-400 dark:antialiased"
        >
          {props.subtitle}
        </h2>
      )}
    </div>
  )
}

type ContentSectionProps = {
  children: React.ReactNode
  className?: string
}

export const ContenteSection = (props: ContentSectionProps): JSX.Element => {
  return (
    <section
      className={clsx(
        "rounded-md shadow-sm dark:shadow-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600",
        props.className
      )}
    >
      {props.children}
    </section>
  )
}

type ContentSectionTitleProps = {
  className?: string
  children: React.ReactNode
}

export const ContentSectionTitle = (props: ContentSectionTitleProps): JSX.Element => {
  return (
    <h3
      className={clsx(
        "flex items-center space-x-2 px-4 py-5 sm:px-6 text-2xl text-gray-800 dark:text-gray-50 dark:antialiased",
        props.className
      )}
    >
      {props.children}
    </h3>
  )
}
