export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-6xl font-black mb-12">
        Contact
      </h1>

      <div className="glass rounded-3xl p-10 space-y-6">
        <input
          placeholder="Your Name"
          className="w-full bg-white/5 rounded-xl p-4 text-white placeholder-white/50"
        />

        <input
          placeholder="Your Email"
          className="w-full bg-white/5 rounded-xl p-4 text-white placeholder-white/50"
        />

        <textarea
          placeholder="Your Message"
          rows={6}
          className="w-full bg-white/5 rounded-xl p-4 text-white placeholder-white/50"
        />

        <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition">
          Send Message
        </button>
      </div>
    </main>
  )
}
