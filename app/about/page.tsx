import { getContent } from "@/lib/contentStore";

export default async function AboutPage() {
  const { about } = await getContent();
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-6xl font-black mb-12">{about.title}</h1>
      <div className="glass rounded-3xl p-10 space-y-8">
        <p className="text-xl text-white/80 leading-relaxed whitespace-pre-line">
          {about.description}
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {about.skills.map((skill, index) => (
            <div key={index} className="bg-white/5 rounded-2xl p-5">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
