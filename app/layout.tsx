import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getContent } from '@/lib/contentStore'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent()
  return { title: site.title, description: site.description }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { site } = await getContent()
  return (
    <html lang="en">
      <body className="gradient-bg min-h-screen">
        <Navbar site={site} />
        {children}
        <Footer text={site.footer} />
      </body>
    </html>
  )
}
