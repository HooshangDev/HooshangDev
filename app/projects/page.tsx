import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

export default function ProjectsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-6xl font-black mb-20">
        Projects
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
          />
        ))}
      </div>
    </main>
  )
}
