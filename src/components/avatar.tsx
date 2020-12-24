type AvatarProps = {
  src: string
  alt?: string
}

const Avatar = (props: AvatarProps) => {
  const { src, alt = "avatar" } = props

  return (
    <img
      data-testid="avatar"
      className="h-10 w-10 rounded-full border-2 border-gray-700"
      src={src}
      alt={alt}
    />
  )
}

export default Avatar
