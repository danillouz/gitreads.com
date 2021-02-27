import clsx from "clsx"

type AvatarProps = {
  src: string
  alt?: string
  className?: string
}

const Avatar = (props: AvatarProps): JSX.Element => {
  const { src, alt, className } = props

  return (
    <span
      className={clsx(
        "inline-block overflow-hidden bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-full shadow-sm w-10 h-10",
        className
      )}
    >
      <img data-testid="avatar" className="text-xs w-100 h-100" src={src} alt={alt} />
    </span>
  )
}

export default Avatar
