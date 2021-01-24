import Link from "next/link"
import { HomeShell } from "@components/shell"
import { appRoute } from "@config/auth"

export const Home = (): JSX.Element => {
  return (
    <HomeShell>
      <div className="px-4 mx-auto page-container">
        <h1
          data-testid="hero"
          className="mt-10 mb-8 font-bold leading-none tracking-tight text-7xl md:text-8xl lg:text-9xl sm:mt-14 sm:mb-10"
        >
          <span className="antialiased text-gradient orange-gradient">Track.</span>
          <br />
          <span className="antialiased text-gradient blue-gradient">Organize.</span>
          <br />
          <span className="antialiased text-gradient pink-gradient">Share.</span>
        </h1>

        <p className="max-w-screen-lg antialiased text-gray-400 text-md sm:text-2xl sm:leading-10">
          Use a Git repository to{" "}
          <b className="font-medium text-white">collect and showcase what you read</b>.
        </p>

        <div className="flex flex-wrap items-center my-12 text-center">
          <Link href={appRoute}>
            <a className="flex items-center w-full space-x-2 text-white rounded-lg shadow-md purple-gradient hover:shadow-purple-blur sm:w-auto btn sm:btn-lg focus:ring-offset-gray-800 focus:ring-white">
              <span>Git started for free</span>

              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </HomeShell>
  )
}

export default Home
