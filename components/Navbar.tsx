import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">MS</h1>

        <div className="flex gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  )
}
