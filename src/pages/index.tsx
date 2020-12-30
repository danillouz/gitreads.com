import Link from "next/link"
import { HomeShell } from "@components/shell"
import { appRoute } from "@config/auth"

export const Home = (): JSX.Element => {
  return (
    <HomeShell>
      <div className="page-container">
        <h1 data-testid="hero" className="hero">
          <span className="text-orange-gradient">Track.</span>
          <br />
          <span className="text-purple-gradient">Organize.</span>
          <br />
          <span className="text-pink-gradient">Share.</span>
        </h1>

        <p className="max-w-screen-lg font-medium text-gray-500 text-md sm:text-2xl sm:leading-10">
          With GitReads you can{" "}
          <b className="font-bold text-gray-800">collect and showcase books you read</b> by using a
          Git repository.
        </p>

        <div className="flex flex-wrap items-center my-12 text-center">
          <Link href={appRoute}>
            <a className="flex-none w-full text-lg sm:w-auto btn-retro">Git started</a>
          </Link>
        </div>
      </div>
    </HomeShell>
  )
}

export default Home
