'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-blue-400 mb-4 uppercase tracking-[0.3em]">
            Unreal / Unity Developer
          </p>

          <h1 className="text-6xl md:text-8xl font-black leading-none mb-6">
            Manouchehr
            <br />
            Soltani
          </h1>

          <p className="text-white/70 text-xl leading-relaxed max-w-xl mb-10">
            Gameplay & Systems Engineer specializing in multiplayer,
            physics-driven gameplay, backend systems, procedural generation,
            and creating polished gameplay experiences with Unreal Engine and
            Unity.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/projects"
              className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition"
            >
              View Projects
            </a>

            <a
              href="/contact"
              className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition"
            >
              Contact
            </a>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl" />

            {/* Image Frame */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl">
              <Image
                src="/me.HEIC"
                alt="Manouchehr Soltani"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}