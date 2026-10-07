import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
        <h1 className="font-bold text-xl">MS</h1>

        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/projects#snake-quizz-ladder" className="text-lime-300">Snake Quizz Ladder</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  )
}
