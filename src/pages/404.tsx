import Link from "next/link"

const NotFound = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-center">
        <h1 className="font-bold leading-none tracking-tight text-7xl md:text-8xl lg:text-9xl">
          <span className="text-orange-gradient">4</span>
          <span className="text-blue-gradient">0</span>
          <span className="text-pink-gradient">4</span>
        </h1>

        <h2 className="mt-4 text-3xl font-medium text-gray-400 md:text-4xl lg:text-5xl">
          Page not found
        </h2>

        <div className="flex flex-wrap items-center justify-center mt-6 text-center">
          <Link href="/">
            <a className="flex-none w-full px-4 py-2 text-lg text-white underline transition duration-200 sm:w-auto hover:no-underline focus:outline-white">
              Homepage
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
