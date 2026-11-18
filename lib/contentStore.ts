import "server-only";
import { readFile, writeFile, rename, mkdir } from "node:fs/promises";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { Content, validateContent } from "./content";

const file = path.join(process.cwd(), "data", "content.json");
export async function readContentSnapshot() {
  const raw = await readFile(file, "utf8");
  return {
    content: JSON.parse(raw) as Content,
    revision: createHash("sha256").update(raw).digest("hex"),
  };
}
export async function getContent() {
  return (await readContentSnapshot()).content;
}
let saving = false;
export async function saveContent(content: unknown, revision: string) {
  if (saving) throw new Error("Another save is in progress. Try again.");
  saving = true;
  try {
    validateContent(content);
    const previous = await readContentSnapshot();
    if (revision !== previous.revision)
      throw new Error(
        "Content changed in another window. Reload before saving.",
      );
    const backupDir = path.join(process.cwd(), ".content-backups");
    await mkdir(backupDir, { recursive: true });
    await writeFile(
      path.join(backupDir, `${Date.now()}-${randomUUID()}.json`),
      JSON.stringify(previous.content, null, 2),
    );
    const temporary = `${file}.${randomUUID()}.tmp`;
    await writeFile(temporary, JSON.stringify(content, null, 2) + "\n", "utf8");
    await rename(temporary, file);
    return await readContentSnapshot();
  } finally {
    saving = false;
  }
}
