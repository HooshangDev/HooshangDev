import { NextResponse } from 'next/server'
import { getRecentVisits, recordVisit } from '@/lib/visitorStore'

export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json(
    { visits: getRecentVisits() },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

export async function POST(request: Request) {
  if (request.headers.get('x-visitor-ingest') !== '1') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const body = (await request.json()) as {
    path?: unknown
    userAgent?: unknown
    language?: unknown
    referrer?: unknown
  }

  recordVisit({
    path: typeof body.path === 'string' ? body.path.slice(0, 200) : '/',
    userAgent:
      typeof body.userAgent === 'string'
        ? body.userAgent.slice(0, 500)
        : request.headers.get('user-agent') || 'Unknown browser',
    language: typeof body.language === 'string' ? body.language.slice(0, 80) : 'Unknown',
    referrer: typeof body.referrer === 'string' ? body.referrer.slice(0, 500) : 'Direct visit',
  })

  return new NextResponse(null, { status: 204 })
}
