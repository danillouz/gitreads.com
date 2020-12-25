import Link from "next/link"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="text-center">
        <h1 className="hero">
          <span className="text-orange-gradient">4</span>
          <span className="text-purple-gradient">0</span>
          <span className="text-pink-gradient">4</span>
        </h1>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-400">
          Page not found
        </h2>

        <div className="flex flex-wrap items-center justify-center text-center my-14">
          <Link href="/">
            <a className="w-full sm:w-auto flex-none nav-link-cta text-lg">Back home</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
