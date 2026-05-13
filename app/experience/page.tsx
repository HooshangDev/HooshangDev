export default function ExperiencePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-6xl font-black mb-16">
        Experience
      </h1>

      <div className="space-y-8">
        <section className="glass rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-4">
            Manataz Studio
          </h2>

          <p className="text-blue-400 mb-6">
            Gameplay & Systems Engineer — 2023–2025
          </p>

          <div className="space-y-8 text-white/80">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                EverRide (formerly RogueRider) — Unreal Engine Multiplayer Racing Game
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Designed and implemented full racing gameplay systems including nitro, drifting mechanics, AI/player interaction, and procedural track generation.</li>
                <li>Built spline-based vehicle movement, hybrid physics controller, and dynamic drift scoring.</li>
                <li>Designed custom replication system for real-time racing and a transform-buffer-based synchronization system.</li>
                <li>Integrated Android marketplace systems (Bazaar), developed missing Unreal Engine plugins (Java + Android SDK, JNI bridge, AndroidManifest modifications), and implemented IAP, version control, and store API integration.</li>
                <li>Implemented server-side SQLite data storage and managed player state synchronization.</li>
                <li>Owned UI, gameplay, backend integration, database, and server logic systems.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Kinetic (Urban Ranger) — Unreal Engine Multiplayer FPS
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Built weapon systems including guns, grenades, and usable items.</li>
                <li>Implemented team deathmatch + capture point hybrid gameplay.</li>
                <li>Developed kill/objective-based scoring and win/loss logic.</li>
                <li>Created character selection, inventory, and loadout management systems.</li>
                <li>Designed capture point control with passive scoring and objective-based multiplayer loop.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Detective Mehrdad — Unity Engine Live Ops Game Takeover
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Took over an undocumented Unity codebase and onboarded independently.</li>
                <li>Implemented hidden object gameplay, mission and reward system, event-based gameplay framework, and slot machine-style daily reward.</li>
                <li>Integrated Node.js backend server, player data management, migration to server-based architecture, and server-side purchase validation.</li>
                <li>Built remote configuration systems for balancing, event rules, item availability, and offer management.</li>
                <li>Implemented avatar, inventory, clothing/cosmetic, and rank-based item unlocking systems.</li>
                <li>Handled player data migration, data consistency fixes, and server-authoritative data flow.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Kaleh VR Cooking Experience — Unity VR Advergaming Project
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Took over development leadership, guided implementation and debugging, and delivered the VR cooking experience.</li>
                <li>Built customer registration and OTP verification system for event participation tracking and marketing CRM.</li>
                <li>Worked on VR interaction systems, technical leadership, and client-facing delivery.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Chimpanzini Bananini — Node.js Advergaming Backend
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Built backend system for player registration, phone number storage, and gameplay user tracking.</li>
                <li>Developed item-combination progression logic.</li>
                <li>Implemented Excel export system for lottery selection and marketing campaign reporting.</li>
                <li>Enabled client-side winner selection workflows.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Additional Advergaming Backend Systems
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Built Node.js backend infrastructure for multiple advergames.</li>
                <li>Managed user tracking, data storage, and campaign reporting systems.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="glass rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-4">
            Current Work
          </h2>

          <p className="text-blue-400 mb-6">
            2026
          </p>

          <ul className="space-y-3 text-white/80 list-disc list-inside">
            <li>Firebase push notification implementation</li>
            <li>Metrix analytics SDK integration</li>
            <li>Expansion of internal game analytics</li>
            <li>Unified event tracking across systems</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
