import clsx from "clsx"

type ListProps = {
  children: React.ReactNode
  className?: string
}

export const List = (props: ListProps) => {
  return (
    <ul className={clsx("divide-y divide-gray-200 dark:divide-gray-600", props.className)}>
      {props.children}
    </ul>
  )
}

type ListItemProps = {
  children: React.ReactNode
  className?: string
}

export const ListItem = (props: ListItemProps) => {
  return (
    <li
      className={clsx(
        "px-4 py-5 sm:px-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200",
        props.className
      )}
    >
      {props.children}
    </li>
  )
}
