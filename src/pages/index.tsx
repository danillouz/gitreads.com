import Link from "next/link"
import { version } from "../../package.json"

import { HomeShell } from "@components/shell"
import { Logo } from "@components/logo"
import { dashboardRoute } from "@config/auth"

export const Home = (): JSX.Element => {
  return (
    <HomeShell>
      <div className="page-container mx-auto px-4">
        <div className="mt-10 sm:mt-14">
          <Logo className="w-auto h-8 sm:h-10 lg:h-12 text-gray-800 dark:text-gray-50 dark:antialiased" />
          <span className="inline-block mt-2 text-xs lg:text-sm text-gray-500 dark:text-gray-400">
            Alpha v{version}
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight mt-8 mb-6 sm:mt-12 sm:mb-10">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 dark:antialiased">
            Your online bookshelf
          </span>
        </h2>

        <p className="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-500 dark:text-gray-400 dark:antialiased">
          Use a Git repository to collect and showcase what you read.
        </p>

        <div className="flex flex-wrap items-center text-center">
          <Link href={dashboardRoute}>
            <a className="btn sm:btn-lg w-full sm:w-auto space-x-2 text-gray-800 dark:text-orange-300 bg-orange-100 dark:bg-gray-800 hover:bg-orange-50 focus:bg-orange-50 border border-gray-800 dark:border-orange-300 shadow-retro hover:shadow-retro-lg focus:shadow-retro-lg focus:outline-none dark:focus:outline-white">
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
