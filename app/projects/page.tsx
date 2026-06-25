'use client'

import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import { useState } from 'react'
import ProjectModal from '@/components/ProjectModal'

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null)

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
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </main>
  )
}
