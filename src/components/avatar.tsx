import { useState } from "react"
import classnames from "classnames"

type AvatarProps = {
  src: string
  alt?: string
}

const Avatar = (props: AvatarProps): JSX.Element => {
  const { src, alt = "user avatar" } = props

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const onImgLoad = () => setIsLoaded(true)
  const onImgLoadErr = () => setIsLoaded(true)

  return (
    <span className="h-10 w-10 inline-block overflow-hidden rounded-full border-2 border-gray-700 bg-gray-500">
      <img
        data-testid="avatar"
        className={classnames("w-100 h-100 transition-opacity duration-200 text-xs", {
          "opacity-0": !isLoaded,
          "opacity-100": isLoaded,
        })}
        src={src}
        alt={alt}
        onLoad={onImgLoad}
        onError={onImgLoadErr}
      />
    </span>
  )
}

export default Avatar
