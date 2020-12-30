type FooterProps = {
  children?: React.ReactNode
}

const Footer = (props: FooterProps): JSX.Element => {
  return (
    <footer className="py-8 bg-gray-800">
      <div className="page-container">
        <div className="flex flex-wrap items-center -mx-3 space-x-3">{props.children}</div>

        <p data-testid="copyright" className="px-3 py-2 mt-2 -mx-3 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} GitReads
        </p>
      </div>
    </footer>
  )
}

export default Footer
