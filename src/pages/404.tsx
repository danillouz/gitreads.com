import Link from "next/link"

const NotFound = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <h1 className="font-bold leading-none tracking-tight text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 dark:antialiased">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-medium text-gray-500 dark:text-gray-400 dark:antialiased md:text-4xl lg:text-5xl">
          Page n🥸t found.
        </h2>

        <div className="flex flex-wrap items-center justify-center mt-6 text-center">
          <Link href="/">
            <a className="flex-none w-full px-4 py-2 text-lg text-gray-800 dark:text-gray-50 underline transition duration-200 sm:w-auto hover:no-underline focus:outline-black dark:focus:outline-white">
              Go back home
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
