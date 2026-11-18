import Link from 'next/link'
import type { Content } from '@/lib/content'

export default function Navbar({ site }: { site: Content['site'] }) {
  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
        <Link href="/" className="font-bold text-xl">{site.brand}</Link>

        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
          {site.navigation.map((link, index) => <Link key={index} href={link.href}>{link.label}</Link>)}
        </div>
      </div>
    </nav>
  )
}
