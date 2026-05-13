export default function ExperiencePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-6xl font-black mb-16">
        Experience
      </h1>

      <div className="glass rounded-3xl p-10">
        <h2 className="text-3xl font-bold mb-4">
          Manataz Studio
        </h2>

        <p className="text-blue-400 mb-6">
          Gameplay & Systems Engineer — 2023–Present
        </p>

        <ul className="space-y-4 text-white/70">
          <li>• Unreal multiplayer replication systems</li>
          <li>• Backend architecture with Node.js and SQLite</li>
          <li>• Unity live ops system engineering</li>
          <li>• Android JNI integration</li>
          <li>• Physics-driven gameplay systems</li>
        </ul>
      </div>
    </main>
  )
}
