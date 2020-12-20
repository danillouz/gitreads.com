import Head from "next/head"

type PageProps = {
  title?: string
  description?: string
  children: React.ReactNode
}

const Page = (props: PageProps) => {
  const { title = "GitReads", description = "Track and share what you read." } = props

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#1e293b" />
        <meta name="msapplication-TileColor" content="#d946ef" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d946ef" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {props.children}
    </>
  )
}

export default Page
