import Hero from '@/components/Hero'
import FeaturedGame from '@/components/FeaturedGame'
import VisitorPanel from '@/components/VisitorPanel'

export default function HomePage() {
  return (
    <main>
      <VisitorPanel />
      <Hero />
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <FeaturedGame />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            'Multiplayer Systems',
            'Physics Gameplay',
            'Backend Engineering',
            'Procedural Generation',
            'VR Interaction Systems',
            'Assessment Tooling'
          ].map((item) => (
            <div
              key={item}
              className="glass rounded-3xl p-8 hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold">{item}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
