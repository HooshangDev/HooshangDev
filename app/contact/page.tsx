import { FaLinkedin, FaGithub, FaTelegramPlane } from "react-icons/fa"

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">

      <h1 className="text-6xl font-black mb-12">
        Contact
      </h1>

      <div className="glass rounded-3xl p-10 space-y-6">

        <p className="text-white/70 text-lg">
          You can reach me through my social platforms:
        </p>

        <div className="flex flex-col gap-4">

          <a
            href="https://linkedin.com/in/manouchehr-soltani-the-creator"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-8 py-4 bg-white text-black rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-white/90 transition"
          >
            <FaLinkedin size={22} />
            LinkedIn
          </a>


          <a
            href="https://github.com/HooshangDev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-8 py-4 bg-white/10 text-white rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-white/20 transition"
          >
            <FaGithub size={22} />
            GitHub
          </a>


          <a
            href="https://t.me/manouchehr_st"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-8 py-4 bg-white/10 text-white rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-white/20 transition"
          >
            <FaTelegramPlane size={22} />
            Telegram
          </a>

        </div>

      </div>

    </main>
  )
}