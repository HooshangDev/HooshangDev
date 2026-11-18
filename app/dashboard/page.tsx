import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { isLocalDashboard } from "@/lib/localDashboard";
import { readContentSnapshot } from "@/lib/contentStore";
import Dashboard from "@/components/Dashboard";

export default async function DashboardPage() {
  if (!isLocalDashboard((await headers()).get("host"))) notFound();
  return <Dashboard initial={await readContentSnapshot()} />;
}
