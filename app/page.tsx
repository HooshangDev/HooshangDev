import Hero from '@/components/Hero'

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            'Multiplayer Systems',
            'Physics Gameplay',
            'Backend Engineering',
            'Procedural Generation'
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
