"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  ExternalLink,
  LayoutDashboard,
} from "lucide-react";
import type { Content } from "@/lib/content";

type Snapshot = { content: Content; revision: string };
type Value = string | boolean | Value[] | { [key: string]: Value };
const labels: Record<string, string> = {
  site: "Site settings",
  home: "Home",
  projectsPage: "Projects page",
  projects: "Projects",
  featured: "Featured project",
  about: "About",
  experience: "Experience",
  contact: "Contact",
  href: "Link",
  image: "Cover image",
  screenshots: "Screenshots",
  video: "Gameplay video",
  commercial: "Commercial experience",
  personal: "Personal projects",
  projectTitle: "Featured project",
  firstName: "First name",
  lastName: "Last name",
  techStack: "Tech stack",
  moreTitle: "Project list heading",
};
const label = (key: string) =>
  labels[key] ||
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
const inputClass =
  "w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20";
const projectTemplate = {
  title: "New project",
  engine: "",
  description: "",
  image: "",
  screenshots: [],
  video: "",
  highlights: [],
  cover: { eyebrow: "", title: "", detail: "", accent: "#2563eb" },
};
const experienceTemplate = {
  title: "New experience",
  subtitle: "",
  engine: "",
  image: "",
  bullets: [],
  skills: [],
  featured: false,
};
const templates: Record<string, Value> = {
  projects: projectTemplate,
  commercial: experienceTemplate,
  personal: experienceTemplate,
  stats: { value: "", label: "" },
  links: { label: "", href: "" },
  navigation: { label: "", href: "" },
  actions: { label: "", href: "" },
  updates: { title: "", description: "" },
};

function Editor({
  value,
  onChange,
  field,
  path,
}: {
  value: Value;
  onChange: (value: Value) => void;
  field: string;
  path: string;
}) {
  if (typeof value === "boolean")
    return (
      <label className="flex items-center gap-3 py-3">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
          className="h-5 w-5 accent-blue-400"
        />
        {label(field)}
      </label>
    );
  if (typeof value === "string") {
    const multiline =
      /description|summary|footer|title/.test(field) &&
      (field !== "title" || value.includes("\n"));
    return (
      <label className="block space-y-2">
        <span className="text-sm font-medium text-white/75">
          {label(field)}
        </span>
        {multiline ? (
          <textarea
            className={inputClass}
            rows={field === "description" ? 5 : 3}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : (
          <input
            className={inputClass}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
        {/image|portrait|video/.test(field) && (
          <span className="block text-xs text-white/40">
            Use a public folder path, e.g. /images/projects/cover.png.
          </span>
        )}
      </label>
    );
  }
  if (Array.isArray(value)) {
    const objectList =
      field in templates || value.some((item) => typeof item === "object");
    if (!objectList)
      return (
        <label className="block space-y-2">
          <span className="text-sm font-medium text-white/75">
            {label(field)}
          </span>
          <textarea
            className={inputClass}
            rows={Math.min(8, Math.max(3, value.length + 1))}
            value={value.join("\n")}
            onChange={(event) =>
              onChange(
                event.target.value === "" ? [] : event.target.value.split("\n"),
              )
            }
          />
          <span className="block text-xs text-white/40">
            One item per line. Clear the field to remove all items.
          </span>
        </label>
      );
    const move = (index: number, direction: number) => {
      const next = [...value];
      [next[index], next[index + direction]] = [
        next[index + direction],
        next[index],
      ];
      onChange(next);
    };
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">
            {label(field)}{" "}
            <span className="text-white/40">({value.length})</span>
          </h3>
          <button
            type="button"
            onClick={() =>
              onChange([
                ...value,
                structuredClone(templates[field] || value[0]),
              ])
            }
            className="flex items-center gap-2 rounded-lg bg-blue-400/15 px-3 py-2 text-sm text-blue-300"
          >
            <Plus size={16} />
            Add item
          </button>
        </div>
        {value.length === 0 && (
          <p className="rounded-xl border border-dashed border-white/15 p-6 text-sm text-white/40">
            No items yet. Add your first one.
          </p>
        )}
        {value.map((item, index) => (
          <details
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.025]"
            open={value.length === 1}
          >
            <summary className="cursor-pointer p-5 font-medium">
              {index + 1}.{" "}
              {typeof item === "object" && !Array.isArray(item)
                ? String(item.title || item.label || `Item ${index + 1}`)
                : `Item ${index + 1}`}
            </summary>
            <div className="space-y-5 border-t border-white/10 p-5">
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  title="Move up"
                  aria-label={`Move item ${index + 1} up`}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  className="rounded-lg p-2 hover:bg-white/10 disabled:opacity-20"
                >
                  <ChevronUp size={18} />
                </button>
                <button
                  type="button"
                  title="Move down"
                  aria-label={`Move item ${index + 1} down`}
                  disabled={index === value.length - 1}
                  onClick={() => move(index, 1)}
                  className="rounded-lg p-2 hover:bg-white/10 disabled:opacity-20"
                >
                  <ChevronDown size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Remove this item? You can discard changes before saving.",
                      )
                    )
                      onChange(
                        value.filter((_, position) => position !== index),
                      );
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
              <Editor
                field="item"
                path={`${path}.${index}`}
                value={item}
                onChange={(next) =>
                  onChange(
                    value.map((old, position) =>
                      position === index ? next : old,
                    ),
                  )
                }
              />
            </div>
          </details>
        ))}
      </section>
    );
  }
  return (
    <div className="grid gap-6">
      {Object.entries(value).map(([key, child]) => (
        <Editor
          key={key}
          field={key}
          path={`${path}.${key}`}
          value={child}
          onChange={(next) => onChange({ ...value, [key]: next })}
        />
      ))}
    </div>
  );
}

function editable(content: Content): Content {
  return {
    ...content,
    projects: content.projects.map((project) => ({
      ...structuredClone(projectTemplate),
      ...project,
    })),
    experience: {
      ...content.experience,
      commercial: content.experience.commercial.map((entry) => ({
        ...experienceTemplate,
        ...entry,
      })),
      personal: content.experience.personal.map((entry) => ({
        ...experienceTemplate,
        ...entry,
      })),
    },
  };
}

function cleanLists(value: unknown): unknown {
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === "string"))
      return value.map((item) => item.trim()).filter(Boolean);
    return value.map(cleanLists);
  }
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, cleanLists(child)]),
    );
  return value;
}

export default function Dashboard({ initial }: { initial: Snapshot }) {
  const [baseline, setBaseline] = useState(() => editable(initial.content));
  const [content, setContent] = useState(() => editable(initial.content));
  const [revision, setRevision] = useState(initial.revision);
  const [section, setSection] = useState<keyof Content>("projects");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const dirty = JSON.stringify(content) !== JSON.stringify(baseline);
  useEffect(() => {
    if (!dirty) return;
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);
  async function save() {
    setSaving(true);
    setMessage("");
    setError(false);
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: cleanLists(content), revision }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save.");
      const next = editable(result.content);
      setContent(next);
      setBaseline(next);
      setRevision(result.revision);
      setMessage(
        "Saved to disk. Refresh the portfolio preview to see your changes.",
      );
    } catch (failure) {
      setError(true);
      setMessage(
        failure instanceof Error ? failure.message : "Could not save.",
      );
    } finally {
      setSaving(false);
    }
  }
  function update(next: Value) {
    setMessage("");
    setContent((old) => {
      const updated = { ...old, [section]: next } as Content;
      if (section === "projects") {
        const previousIndex = old.projects.findIndex(
          (project) => project.title === old.featured.projectTitle,
        );
        if (
          previousIndex >= 0 &&
          !updated.projects.some(
            (project) => project.title === old.featured.projectTitle,
          )
        ) {
          updated.featured = {
            ...old.featured,
            projectTitle:
              updated.projects.length === old.projects.length
                ? updated.projects[previousIndex].title
                : "",
          };
        }
      }
      return updated;
    });
  }
  const preview =
    section === "home" || section === "site" || section === "featured"
      ? "/"
      : section === "projectsPage" || section === "projects"
        ? "/projects"
        : `/${section}`;
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            <LayoutDashboard size={16} />
            Local content studio
          </p>
          <h1 className="text-4xl font-black">
            Your portfolio, in your hands.
          </h1>
          <p className="mt-3 text-white/50">
            Edit content, manage projects and save directly to this workspace.
          </p>
        </div>
        <a
          href={preview}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm"
        >
          <ExternalLink size={16} />
          Open preview
        </a>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[230px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 lg:sticky lg:top-24">
          <nav
            aria-label="Dashboard sections"
            className="flex flex-wrap gap-1 lg:flex-col"
          >
            {(Object.keys(content) as (keyof Content)[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSection(key)}
                aria-current={section === key ? "page" : undefined}
                className={`rounded-xl px-4 py-3 text-left text-sm transition ${section === key ? "bg-blue-400/15 font-semibold text-blue-200" : "text-white/60 hover:bg-white/5"}`}
              >
                {label(key)}
              </button>
            ))}
          </nav>
          <p className="mt-4 border-t border-white/10 px-4 pt-4 text-xs leading-relaxed text-white/40">
            Changes are saved in data/content.json. Each save creates a backup.
          </p>
          <Link href="/" className="mt-4 block px-4 py-2 text-sm text-white/60">
            ← Back to portfolio
          </Link>
        </aside>
        <div className="min-w-0">
          <div className="sticky top-20 z-20 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-zinc-950/95 p-4 backdrop-blur-xl">
            <div>
              <h2 className="font-semibold">{label(section)}</h2>
              <p
                className={`mt-1 text-xs ${dirty ? "text-amber-300" : "text-white/40"}`}
              >
                {dirty ? "Unsaved changes" : "All changes saved"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={!dirty || saving}
                onClick={() => {
                  if (window.confirm("Discard all unsaved changes?")) {
                    setContent(structuredClone(baseline));
                    setMessage("");
                  }
                }}
                className="rounded-xl px-4 py-2 text-sm text-white/60 hover:bg-white/5 disabled:opacity-30"
              >
                Discard
              </button>
              <button
                type="button"
                disabled={!dirty || saving}
                onClick={save}
                className="flex items-center gap-2 rounded-xl bg-blue-400 px-5 py-3 text-sm font-bold text-zinc-950 disabled:opacity-40"
              >
                <Save size={16} />
                {saving ? "Saving…" : "Save all changes"}
              </button>
            </div>
          </div>
          {message && (
            <p
              role={error ? "alert" : "status"}
              className={`mb-5 rounded-xl border p-4 text-sm ${error ? "border-red-400/25 bg-red-400/10 text-red-200" : "border-green-400/25 bg-green-400/10 text-green-200"}`}
            >
              {message}
            </p>
          )}
          <fieldset
            disabled={saving}
            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-8"
          >
            {section === "featured" ? (
              <div className="space-y-6">
                <label className="block space-y-2">
                  <span className="text-sm text-white/75">
                    Featured project
                  </span>
                  <select
                    className={inputClass}
                    value={content.featured.projectTitle}
                    onChange={(event) =>
                      update({
                        ...content.featured,
                        projectTitle: event.target.value,
                      } as unknown as Value)
                    }
                  >
                    <option value="">None — hide featured section</option>
                    {content.projects.map((project, index) => (
                      <option key={index} value={project.title}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </label>
                <Editor
                  field="featured"
                  path="featured"
                  value={
                    Object.fromEntries(
                      Object.entries(content.featured).filter(
                        ([key]) => key !== "projectTitle",
                      ),
                    ) as Value
                  }
                  onChange={(next) =>
                    update({
                      ...(next as object),
                      projectTitle: content.featured.projectTitle,
                    } as Value)
                  }
                />
              </div>
            ) : (
              <Editor
                field={section}
                path={section}
                value={content[section] as unknown as Value}
                onChange={update}
              />
            )}
          </fieldset>
        </div>
      </div>
    </main>
  );
}
