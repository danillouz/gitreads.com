import Head from "next/head"

type PageProps = {
  title?: string
  description?: string
  children: React.ReactNode
}

const Page = (props: PageProps) => {
  const { title = "GitReads", description = "Collect and showcase books you read." } = props

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="theme-color" content="#1e293b" />

        <link rel="icon" href="/img/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="preload"
          href="/fonts/inter-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-600.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <link rel="preconnect" href="https://gitreads.eu.auth0.com" />
      </Head>

      {props.children}
    </>
  )
}

export default Page
