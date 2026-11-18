export default function Footer({ text }: { text: string }) {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center text-white/50">
        {text}
      </div>
    </footer>
  )
}
