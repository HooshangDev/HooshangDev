import type { Project } from "@/data/projects";

// Keep the schema independent of editable content, including when lists are empty.
const link = { label: "", href: "" };
const defaults = {
  site: {
    title: "",
    description: "",
    brand: "",
    footer: "",
    navigation: [link],
  },
  home: {
    eyebrow: "",
    firstName: "",
    lastName: "",
    description: "",
    portrait: "",
    actions: [link],
    skills: [""],
  },
  projectsPage: { title: "", moreTitle: "" },
  featured: {
    projectTitle: "",
    eyebrow: "",
    tagline: "",
    summary: "",
    status: "",
    detailsLabel: "",
    contactLabel: "",
    updates: [{ title: "", description: "" }],
  },
  about: { title: "", description: "", skills: [""] },
  experience: {
    eyebrow: "",
    title: "",
    description: "",
    techTitle: "",
    techStack: [""],
    stats: [{ value: "", label: "" }],
    commercial: [],
    personal: [],
    personalTitle: "",
    focusTitle: "",
    focus: [""],
  },
  contact: { title: "", description: "", links: [link] },
};

export interface ExperienceEntry {
  title: string;
  subtitle: string;
  engine: string;
  bullets: string[];
  skills?: string[];
  image?: string;
  featured?: boolean;
}
export type Content = Omit<typeof defaults, "projects" | "experience"> & {
  projects: Project[];
  experience: Omit<typeof defaults.experience, "commercial" | "personal"> & {
    commercial: ExperienceEntry[];
    personal: ExperienceEntry[];
  };
};

export function validateContent(value: unknown): asserts value is Content {
  function check(data: unknown, sample: unknown, path: string): void {
    if (typeof sample === "string") {
      if (typeof data !== "string" || data.length > 50000)
        throw new Error(`${path} must be text (up to 50,000 characters).`);
      if (
        /href$/.test(path) &&
        data &&
        !/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(data)
      )
        throw new Error(
          `${path} must be a local path or an HTTP, email, or phone link.`,
        );
      if (
        /(image|portrait|video)$/.test(path) &&
        data &&
        !/^\/(?!\/)/.test(data)
      )
        throw new Error(`${path} must be a path in public, starting with /.`);
    } else if (typeof sample === "boolean") {
      if (typeof data !== "boolean")
        throw new Error(`${path} must be true or false.`);
    } else if (Array.isArray(sample)) {
      if (!Array.isArray(data) || data.length > 500)
        throw new Error(`${path} must be a list of up to 500 items.`);
      data.forEach((item, index) => check(item, sample[0], `${path}.${index}`));
    } else if (sample && typeof sample === "object") {
      if (!data || typeof data !== "object" || Array.isArray(data))
        throw new Error(`${path} must be an object.`);
      for (const [key, child] of Object.entries(sample))
        check((data as Record<string, unknown>)[key], child, `${path}.${key}`);
    }
  }
  if (!value || typeof value !== "object") throw new Error("Invalid content.");
  const candidate = value as Content;
  for (const key of Object.keys(defaults) as (keyof typeof defaults)[]) {
    if (key !== "experience")
      check(candidate[key], defaults[key], key);
  }
  check(
    candidate.experience,
    { ...defaults.experience, commercial: [], personal: [] },
    "experience",
  );
  for (const group of ["commercial", "personal"] as const) {
    const entries = candidate.experience[group];
    if (!Array.isArray(entries) || entries.length > 500)
      throw new Error("Invalid experience list.");
    entries.forEach((entry, index) => {
      check(
        entry,
        { title: "", subtitle: "", engine: "", bullets: [""] },
        `experience.${group}.${index}`,
      );
      for (const key of ["skills", "image", "featured"] as const)
        if (key in entry)
          check(
            entry[key],
            key === "skills" ? [""] : key === "featured" ? false : "",
            `experience.${group}.${index}.${key}`,
          );
    });
  }
  if (!Array.isArray(candidate.projects) || candidate.projects.length > 500)
    throw new Error("Invalid project list.");
  const titles = new Set<string>();
  candidate.projects.forEach((project, index) => {
    check(
      project,
      { title: "", engine: "", description: "", screenshots: [""] },
      `projects.${index}`,
    );
    if (!project.title.trim() || titles.has(project.title))
      throw new Error("Projects need unique, non-empty titles.");
    titles.add(project.title);
    for (const key of ["image", "video", "highlights", "cover"] as const)
      if (key in project)
        check(
          project[key],
          key === "highlights"
            ? [""]
            : key === "cover"
              ? { eyebrow: "", title: "", detail: "", accent: "" }
              : "",
          `projects.${index}.${key}`,
        );
    project.screenshots.forEach((src) => {
      if (!/^\/(?!\/)/.test(src))
        throw new Error(
          "Screenshots must use paths in public, starting with /.",
        );
    });
  });
  if (
    candidate.featured.projectTitle &&
    !titles.has(candidate.featured.projectTitle)
  )
    throw new Error(
      "Select an existing featured project or leave the selection empty.",
    );
}
