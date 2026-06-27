import Project from '@/components/Project'

export default function ExperiencePage() {
  const techStack = [
    "Unreal Engine 5",
    "Unity",
    "C++",
    "C#",
    "Blueprints",
    "Node.js",
    "Firebase",
    "SQLite",
    "MySQL",
    "Java",
    "JNI",
    "Dedicated Servers",
    "Multiplayer",
    "VR",
    "Android",
    "Live Ops",
    "Game Analytics",
    "Git",
  ]

  const stats = [
    { value: "7+", label: "Commercial Projects" },
    { value: "4+", label: "Years Experience" },
    { value: "3", label: "Published Games" },
    { value: "2", label: "Game Engines" },
  ]

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">

      {/* Hero */}

      <section className="mb-20">

        <p className="uppercase tracking-[0.35em] text-blue-400 font-semibold">
          Gameplay & Systems Engineer
        </p>

        <h1 className="text-7xl font-black mt-4 leading-none">
          Commercial
          <br />
          Game Development
        </h1>

        <p className="max-w-4xl mt-8 text-xl text-white/70 leading-relaxed">
          4+ years developing commercial multiplayer games,
          VR experiences, backend infrastructure and live-service
          systems using Unreal Engine and Unity.
        </p>

      </section>

      {/* Tech */}

      <section className="mb-20">

        <h2 className="text-2xl font-bold mb-8">
          Tech Stack
        </h2>

        <div className="flex flex-wrap gap-3">

          {techStack.map((item) => (
            <div
              key={item}
              className="glass rounded-full px-4 py-2 text-sm font-medium hover:scale-105 transition"
            >
              {item}
            </div>
          ))}

        </div>

      </section>

      {/* Stats */}

      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">

        {stats.map((stat) => (

          <div
            key={stat.label}
            className="glass rounded-3xl p-8 text-center"
          >

            <h3 className="text-5xl font-black text-blue-400">
              {stat.value}
            </h3>

            <p className="mt-2 text-white/70">
              {stat.label}
            </p>

          </div>

        ))}

      </section>

      {/* Experience */}

      <section className="space-y-10">

        <Project
          title="EverRide"
          subtitle="Released • March 18, 2025"
          engine="Unreal Engine"
          featured
          bullets={[
            "Solo developed the complete gameplay architecture from prototype to release.",
            "Designed multiplayer replication and transform-buffer synchronization.",
            "Implemented physics-based vehicles, drifting and spline movement.",
            "Integrated Bazaar Android SDK using custom Java, JNI and Unreal plugins.",
            "Developed gameplay systems, UI, backend integration, dedicated server logic and SQLite database.",
            "Optimized mobile performance and shipped commercial release.",
          ]}
          skills={[
            "Unreal",
            "C++",
            "Networking",
            "JNI",
            "SQLite",
            "Optimization",
          ]}
        />

        <Project
          title="Rogue Rider"
          subtitle="Published • Later redesigned into EverRide"
          engine="Unreal Engine"
          bullets={[
            "Original online racing game.",
            "Implemented multiplayer gameplay systems.",
            "Created the technical foundation later evolved into EverRide.",
          ]}
          skills={["Gameplay", "Networking", "Mobile"]}
        />

        <Project
          title="Kinetic (Urban Ranger)"
          subtitle="Multiplayer FPS"
          engine="Unreal Engine"
          bullets={[
            "Implemented weapons, grenades and inventory systems.",
            "Developed capture-point multiplayer gameplay.",
            "Built scoring, objectives and match flow.",
          ]}
          skills={[
            "FPS",
            "Gameplay",
            "Replication",
          ]}
        />

        <Project
          title="Detective Mehrdad"
          subtitle="Released • November 2025"
          engine="Unity"
          featured
          bullets={[
            "Took ownership of an undocumented production codebase.",
            "Built Live Ops systems including events, missions and progression.",
            "Integrated Node.js backend and Bazaar IAP.",
            "Developed remote configuration and server-authoritative progression.",
            "Implemented cosmetics, inventory, avatar and daily rewards.",
          ]}
          skills={[
            "Unity",
            "Node.js",
            "Live Ops",
            "Backend",
          ]}
        />

        <Project
          title="Kalleh VR Cooking"
          subtitle="VR Advertisement"
          engine="Unity"
          bullets={[
            "Led development completion.",
            "Mentored junior developer.",
            "Implemented VR gameplay interactions.",
          ]}
          skills={[
            "VR",
            "Unity",
            "XR",
          ]}
        />

        <Project
          title="Kalleh Verification Platform"
          subtitle="Client + Server"
          engine="Node.js"
          bullets={[
            "Built OTP verification platform.",
            "Implemented registration workflow.",
            "Managed customer event data.",
          ]}
          skills={[
            "Node.js",
            "OTP",
            "Backend",
          ]}
        />

        <Project
          title="Merge Campaign Backend"
          subtitle="Node.js"
          engine="Backend"
          bullets={[
            "Built backend for merge advertisement game.",
            "Implemented Excel export system.",
            "Designed player registration and lottery workflows.",
          ]}
          skills={[
            "Node.js",
            "Backend",
            "Excel",
          ]}
        />

      </section>

      {/* Personal */}

      <section className="mt-24">

        <h2 className="text-4xl font-black mb-10">
          Personal Projects
        </h2>

        <Project
          title="Wheelchair Recoil Survival"
          subtitle="In Development"
          engine="Unreal Engine"
          featured
          bullets={[
            "Physics-driven wheelchair movement.",
            "Weapon and inventory systems.",
            "Replication-ready multiplayer architecture.",
            "Co-op survival gameplay.",
          ]}
        />

        <Project
          title="Procedural Maze Generator"
          subtitle="Reusable Unreal Template"
          engine="Unreal Engine"
          bullets={[
            "Optimized procedural maze generation algorithm.",
            "Reusable framework for future games.",
          ]}
        />

        <Project
          title="VR Spaceship Prototype"
          subtitle="Built in one week"
          engine="Unity VR"
          bullets={[
            "Modular tutorial framework.",
            "Step completion and fail system.",
            "Floating draggable VR UI.",
            "Bezier guidance lines.",
            "Singleton audio manager.",
            "Currently expanding with spaceship flight and battery systems.",
          ]}
        />
        <Project
  title="Multiplayer Snake & Ladder"
  subtitle="Online Multiplayer Board Game"
  engine="Unity"
  featured
  bullets={[
    "Developed an online multiplayer board game with matchmaking, real-time chat, multiple concurrent game sessions, and in-app purchases.",
    "Designed a server-authoritative dice system where roll outcomes are generated securely on the server.",
    "Implemented realistic client-side physics simulation that reproduces predetermined dice values while maintaining visual authenticity.",
    "Built pawn movement, networking integration, and core gameplay systems using Unity and C#.",
    "Focused on fair multiplayer gameplay by combining authoritative server logic with believable physics-based dice behavior.",
  ]}
  skills={[
    "Unity",
    "C#",
    "Multiplayer",
    "Networking",
    "Physics",
    "Matchmaking",
    "In-App Purchases",
    "Gameplay Systems",
  ]}
/>
      </section>

      {/* Current */}

      <section className="glass rounded-3xl p-10 mt-24">

        <h2 className="text-3xl font-bold mb-6">
          Current Focus
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-white/80">

          <div>✓ Firebase Push Notifications</div>
          <div>✓ Metrix Analytics SDK</div>
          <div>✓ GameAnalytics Integration</div>
          <div>✓ Live Ops Infrastructure</div>
          <div>✓ Multiplayer Systems</div>
          <div>✓ VR Gameplay Development</div>

        </div>

      </section>

    </main>
  )
}

