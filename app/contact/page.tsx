import { FaLinkedin, FaGithub, FaTelegramPlane } from "react-icons/fa";
import { getContent } from "@/lib/contentStore";

export default async function ContactPage() {
  const { contact } = await getContent();
  const icons = [FaLinkedin, FaGithub, FaTelegramPlane];
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-6xl font-black mb-12">{contact.title}</h1>
      <div className="glass rounded-3xl p-10 space-y-6">
        <p className="text-white/70 text-lg whitespace-pre-line">
          {contact.description}
        </p>
        <div className="flex flex-col gap-4">
          {contact.links.map((link, index) => {
            const Icon = icons.find(
              (_, position) =>
                ["linkedin", "github", "telegram"][position] ===
                link.label.toLowerCase(),
            );
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition ${index === 0 ? "bg-white text-black hover:bg-white/90" : "bg-white/10 text-white hover:bg-white/20"}`}
              >
                {Icon && <Icon size={22} />}
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
