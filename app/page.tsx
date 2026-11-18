import Hero from "@/components/Hero";
import FeaturedGame from "@/components/FeaturedGame";
import VisitorPanel from "@/components/VisitorPanel";
import { getContent } from "@/lib/contentStore";

export default async function HomePage() {
  const content = await getContent();
  return (
    <main>
      <VisitorPanel />
      <Hero home={content.home} />
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <FeaturedGame
          featured={content.featured}
          project={content.projects.find(
            (project) => project.title === content.featured.projectTitle,
          )}
        />
      </div>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {content.home.skills.map((skill, index) => (
            <div
              key={index}
              className="glass rounded-3xl p-8 hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold">{skill}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
