import { NextRequest, NextResponse } from "next/server";
import { isLocalDashboard } from "@/lib/localDashboard";
import { readContentSnapshot, saveContent } from "@/lib/contentStore";

export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  if (!isLocalDashboard(request.headers.get("host")))
    return new NextResponse(null, { status: 404 });
  return NextResponse.json(await readContentSnapshot(), {
    headers: { "Cache-Control": "no-store" },
  });
}
export async function PUT(request: NextRequest) {
  if (!isLocalDashboard(request.headers.get("host")))
    return new NextResponse(null, { status: 404 });
  const origin = request.headers.get("origin");
  if (
    !origin ||
    new URL(origin).host !== request.headers.get("host") ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    return NextResponse.json(
      { error: "Save requests must come from the local dashboard." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json({ error: "Expected JSON." }, { status: 415 });
  try {
    const raw = await request.text();
    if (raw.length > 2_000_000) throw new Error("Content is too large.");
    const { content, revision } = JSON.parse(raw);
    return NextResponse.json(await saveContent(content, revision));
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Could not save content.",
      },
      { status: 400 },
    );
  }
}
