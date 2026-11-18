import Project from "@/components/Project";
import { getContent } from "@/lib/contentStore";

export default async function ExperiencePage() {
  const { experience } = await getContent();
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <section className="mb-20">
        <p className="uppercase tracking-[0.35em] text-blue-400 font-semibold">
          {experience.eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mt-4 leading-none whitespace-pre-line">
          {experience.title}
        </h1>
        <p className="max-w-4xl mt-8 text-xl text-white/70 leading-relaxed whitespace-pre-line">
          {experience.description}
        </p>
      </section>
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8">{experience.techTitle}</h2>
        <div className="flex flex-wrap gap-3">
          {experience.techStack.map((item, index) => (
            <div
              key={index}
              className="glass rounded-full px-4 py-2 text-sm font-medium hover:scale-105 transition"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {experience.stats.map((stat, index) => (
          <div key={index} className="glass rounded-3xl p-8 text-center">
            <h3 className="text-5xl font-black text-blue-400">{stat.value}</h3>
            <p className="mt-2 text-white/70">{stat.label}</p>
          </div>
        ))}
      </section>
      <section className="space-y-10">
        {experience.commercial.map((entry, index) => (
          <Project key={index} {...entry} />
        ))}
      </section>
      <section className="mt-24 space-y-10">
        <h2 className="text-4xl font-black mb-10">
          {experience.personalTitle}
        </h2>
        {experience.personal.map((entry, index) => (
          <Project key={index} {...entry} />
        ))}
      </section>
      <section className="glass rounded-3xl p-10 mt-24">
        <h2 className="text-3xl font-bold mb-6">{experience.focusTitle}</h2>
        <div className="grid md:grid-cols-2 gap-4 text-white/80">
          {experience.focus.map((item, index) => (
            <div key={index}>✓ {item}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
