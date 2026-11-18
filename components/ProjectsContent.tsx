"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";
import type { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import FeaturedGame from "./FeaturedGame";

export default function ProjectsContent({ content }: { content: Content }) {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-6xl font-black mb-10">
        {content.projectsPage.title}
      </h1>
      <FeaturedGame
        featured={content.featured}
        project={content.projects.find(
          (project) => project.title === content.featured.projectTitle,
        )}
      />
      <h2 className="text-3xl font-bold mt-16 mb-8">
        {content.projectsPage.moreTitle}
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        {content.projects
          .filter((project) => project.title !== content.featured.projectTitle)
          .map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onSelect={() => setSelected(project)}
            />
          ))}
      </div>
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
