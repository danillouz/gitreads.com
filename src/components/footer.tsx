type FooterProps = {
  children?: React.ReactNode
}

const Footer = (props: FooterProps): JSX.Element => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="page-container">
        <div className="flex flex-wrap items-center space-x-3">{props.children}</div>

        <p data-testid="copyright" className="mt-2 px-3 py-2 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} GitReads
        </p>
      </div>
    </footer>
  )
}

export default Footer
