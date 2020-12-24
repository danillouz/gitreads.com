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
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;700&display=swap"
        />
      </Head>

      {props.children}
    </>
  )
}

export default Page
