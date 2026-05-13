'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <p className="text-blue-400 mb-4 uppercase tracking-[0.3em]">
          Unreal / Unity Developer
        </p>

        <h1 className="text-6xl md:text-8xl font-black leading-none mb-6">
          Manouchehr
          <br />
          Soltani
        </h1>

        <p className="text-white/70 text-xl mb-10">
          Gameplay & Systems Engineer specializing in multiplayer,
          physics-driven gameplay, backend systems, and procedural generation.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="/projects"
            className="px-8 py-4 bg-white text-black rounded-full font-semibold"
          >
            View Projects
          </a>

          <a
            href="/contact"
            className="px-8 py-4 border border-white/20 rounded-full"
          >
            Contact
          </a>
        </div>
      </motion.div>
    </section>
  )
}
