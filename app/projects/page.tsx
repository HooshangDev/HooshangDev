import { getContent } from "@/lib/contentStore";
import ProjectsContent from "@/components/ProjectsContent";

export default async function ProjectsPage() {
  return <ProjectsContent content={await getContent()} />;
}
