"use client";

import Image from "next/image";
import { useState } from "react";
import type { Content } from "@/lib/content";
import type { Project } from "@/data/projects";
import ProjectModal from "./ProjectModal";

export default function FeaturedGame({
  project,
  featured,
}: {
  project?: Project;
  featured: Content["featured"];
}) {
  const [showDetails, setShowDetails] = useState(false);
  if (!project) return null;
  return (
    <section
      id="snake-quizz-ladder"
      aria-labelledby="featured-game-title"
      className="scroll-mt-40 sm:scroll-mt-28 overflow-hidden rounded-3xl border border-lime-300/25 bg-gradient-to-br from-blue-950/70 via-zinc-950 to-lime-950/30"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative flex items-center bg-blue-950/30 p-4 sm:p-8">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full rounded-2xl"
            />
          )}
        </div>
        <div className="p-6 sm:p-10 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
            {featured.eyebrow}
          </p>
          <h2
            id="featured-game-title"
            className="mt-5 text-4xl font-black leading-tight sm:text-5xl"
          >
            {project.title}
          </h2>
          <p className="mt-4 text-xl font-semibold text-white">
            {featured.tagline}
          </p>
          <p className="mt-4 leading-relaxed text-white/70">
            {featured.summary}
          </p>
          <p className="mt-6 inline-flex rounded-full border border-lime-300/25 bg-lime-300/10 px-4 py-2 text-sm text-lime-200">
            {featured.status}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="rounded-full bg-lime-300 px-6 py-3 font-bold text-zinc-950 transition hover:bg-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
            >
              {featured.detailsLabel}
            </button>
            <a
              href="/contact"
              className="rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              {featured.contactLabel}
            </a>
          </div>
        </div>
      </div>
      <div className="grid gap-6 border-t border-white/10 p-6 sm:p-8 md:grid-cols-3">
        {featured.updates.map((update, index) => (
          <div key={index}>
            <h3 className="font-bold text-lime-200">{update.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              {update.description}
            </p>
          </div>
        ))}
      </div>
      {showDetails && (
        <ProjectModal project={project} onClose={() => setShowDetails(false)} />
      )}
    </section>
  );
}
