import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}

export async function proxy(request: NextRequest) {
  const acceptsHtml = request.headers.get('accept')?.includes('text/html')
  const isPrefetch =
    request.headers.has('next-router-prefetch') ||
    request.headers.get('purpose') === 'prefetch' ||
    request.headers.get('rsc') === '1'

  if ((request.method === 'GET' || request.method === 'HEAD') && acceptsHtml && !isPrefetch) {
    const visitUrl = new URL('/api/visits', request.url)

    await fetch(visitUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-visitor-ingest': '1' },
      body: JSON.stringify({
        path: request.nextUrl.pathname,
        userAgent: request.headers.get('user-agent') || 'Unknown browser',
        language: request.headers.get('accept-language')?.split(',')[0] || 'Unknown',
        referrer: request.headers.get('referer') || 'Direct visit',
      }),
      cache: 'no-store',
    }).catch(() => {
      // A visitor should never be blocked by the optional RAM-only log.
    })
  }

  return NextResponse.next()
}
