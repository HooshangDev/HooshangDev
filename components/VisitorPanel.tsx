'use client'

import { useEffect, useState } from 'react'
import { Eye, X } from 'lucide-react'
import type { VisitEntry } from '@/lib/visitorStore'

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date(value))
}

function shortenBrowser(userAgent: string) {
  if (/Edg\//.test(userAgent)) return 'Edge'
  if (/Chrome\//.test(userAgent)) return 'Chrome'
  if (/Firefox\//.test(userAgent)) return 'Firefox'
  if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) return 'Safari'
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) return 'Mobile browser'
  return 'Other browser'
}

export default function VisitorPanel() {
  const [open, setOpen] = useState(false)
  const [visits, setVisits] = useState<VisitEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return

    let cancelled = false
    setLoading(true)
    setError('')

    fetch('/api/visits', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Could not load visits')
        return response.json() as Promise<{ visits: VisitEntry[] }>
      })
      .then((data) => {
        if (!cancelled) setVisits(data.visits)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load recent visits.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Show recent visitors"
        title="Recent visitors"
        className="fixed bottom-3 left-3 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white/60 shadow-lg backdrop-blur transition hover:border-blue-400/50 hover:text-blue-300"
      >
        <Eye size={13} strokeWidth={1.8} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-start bg-slate-950/60 p-3 backdrop-blur-sm sm:items-center sm:justify-start">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="recent-visits-title"
            className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 text-white shadow-2xl sm:ml-3"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <h2 id="recent-visits-title" className="font-semibold">Recent visitors</h2>
                <p className="mt-0.5 text-xs text-white/45">RAM only · latest 100 page visits</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close recent visitors"
                className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-auto">
              {loading && <p className="px-4 py-8 text-sm text-white/60">Loading visits…</p>}
              {error && <p className="px-4 py-8 text-sm text-red-300">{error}</p>}
              {!loading && !error && visits.length === 0 && (
                <p className="px-4 py-8 text-sm text-white/60">No visits recorded yet.</p>
              )}
              {!loading && !error && visits.length > 0 && (
                <table className="w-full min-w-[560px] text-left text-xs">
                  <thead className="sticky top-0 bg-slate-900 text-white/50">
                    <tr>
                      <th className="px-4 py-2.5 font-medium">Time</th>
                      <th className="px-4 py-2.5 font-medium">Page</th>
                      <th className="px-4 py-2.5 font-medium">Browser</th>
                      <th className="px-4 py-2.5 font-medium">Language</th>
                      <th className="px-4 py-2.5 font-medium">Referrer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {visits.map((visit) => (
                      <tr key={visit.id} className="text-white/75">
                        <td className="whitespace-nowrap px-4 py-3">{formatDate(visit.visitedAt)}</td>
                        <td className="max-w-32 truncate px-4 py-3 font-mono" title={visit.path}>{visit.path}</td>
                        <td className="whitespace-nowrap px-4 py-3">{shortenBrowser(visit.userAgent)}</td>
                        <td className="whitespace-nowrap px-4 py-3">{visit.language}</td>
                        <td className="max-w-40 truncate px-4 py-3" title={visit.referrer}>{visit.referrer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  )
}
