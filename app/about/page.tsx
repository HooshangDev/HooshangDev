export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-6xl font-black mb-12">
        About
      </h1>

      <div className="glass rounded-3xl p-10 space-y-8">
        <p className="text-xl text-white/80 leading-relaxed">
          Gameplay and Systems Engineer with 4+ years of experience
          across Unreal Engine and Unity Engine development,
          specializing in multiplayer architecture,
          backend integration, and physics-driven gameplay systems.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            'Unreal Engine',
            'Unity Engine',
            'C++',
            'C#',
            'Node.js',
            'Procedural Generation'
          ].map((skill) => (
            <div
              key={skill}
              className="bg-white/5 rounded-2xl p-5"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
