import Link from "next/link"

const NotFound = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-center">
        <h1 className="hero">
          <span className="text-orange-gradient">4</span>
          <span className="text-purple-gradient">0</span>
          <span className="text-pink-gradient">4</span>
        </h1>

        <h2 className="text-3xl font-medium text-gray-400 md:text-4xl lg:text-5xl">
          Page not found
        </h2>

        <div className="flex flex-wrap items-center justify-center text-center my-14">
          <Link href="/">
            <a className="flex-none w-full text-lg sm:w-auto nav-link-cta">Back home</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
