import Link from "next/link"

type LogoProps = {
  href: string
}

const Logo = (props: LogoProps): JSX.Element => {
  return (
    <Link href={props.href}>
      <a className="focus:outline-white">
        <img data-testid="logo" className="h-8 w-32" src="/img/logo.svg" alt="GitReads" />
      </a>
    </Link>
  )
}

export default Logo
