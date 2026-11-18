'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Content } from '@/lib/content'

export default function Hero({ home }: { home: Content['home'] }) {
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
            {home.eyebrow}
          </p>

          <h1 className="text-5xl sm:text-6xl xl:text-8xl font-black leading-none mb-6">
            {home.firstName}
            <br />
            {home.lastName}
          </h1>

          <p className="text-white/70 text-xl leading-relaxed max-w-xl mb-10">
            {home.description}
          </p>

          <div className="flex flex-wrap gap-4">
            {home.actions.map((action, index) => <a key={index} href={action.href} className={`px-8 py-4 rounded-full font-semibold transition ${index === 0 ? 'bg-lime-300 text-zinc-950 hover:bg-lime-200' : 'border border-white/20 hover:bg-white/10'}`}>{action.label}</a>)}
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
                src={home.portrait || '/me.jpg'}
                alt={`${home.firstName} ${home.lastName}`}
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
