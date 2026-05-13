import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Manouchehr Soltani | Gameplay & Systems Engineer',
  description: 'Unreal Engine and Unity Gameplay Systems Engineer specializing in multiplayer, backend systems, and physics-driven gameplay.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="gradient-bg min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
