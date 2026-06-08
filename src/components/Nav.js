import Link from 'next/link'

export default function Nav({ cgUrl, rmUrl }) {
  return (
    <header className="nav" role="banner">
      <div className="container">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="Visull home">
            visull<span>.</span>
          </Link>
          <nav aria-label="Main navigation">
            <ul className="nav-links">
              <li><Link href="#tools">Tools</Link></li>
              <li><Link href="#why">About</Link></li>
              <li><Link href="#faq">FAQ</Link></li>
            </ul>
          </nav>
          <div className="nav-cta">
            <a href={cgUrl} className="btn btn-outline btn-sm">CyberGuard</a>
            <a href={rmUrl} className="btn btn-primary btn-sm">ReportMind</a>
          </div>
        </div>
      </div>
    </header>
  )
}
