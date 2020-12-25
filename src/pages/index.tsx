import Link from "next/link"
import { HomeShell } from "@components/shell"

export const Home = (): JSX.Element => {
  return (
    <HomeShell>
      <h1 data-testid="hero" className="hero">
        <span className="text-orange-gradient">Track.</span>
        <br />
        <span className="text-purple-gradient">Organize.</span>
        <br />
        <span className="text-pink-gradient">Share.</span>
      </h1>

      <p className="max-w-screen-lg text-md sm:text-2xl sm:leading-10 font-medium text-gray-500">
        With GitReads you can{" "}
        <b className="text-gray-800 font-bold">collect and showcase books you read</b> by using a
        Git repository.
      </p>

      <div className="flex flex-wrap items-center text-center my-12">
        <Link href="/app">
          <a className="w-full sm:w-auto flex-none btn-retro text-lg">Git started</a>
        </Link>
      </div>
    </HomeShell>
  )
}

export default Home
