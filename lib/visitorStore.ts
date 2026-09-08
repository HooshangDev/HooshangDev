export type VisitEntry = {
  id: string
  visitedAt: string
  path: string
  userAgent: string
  language: string
  referrer: string
}

const MAX_VISITS = 100

// Deliberately module-scoped: visits live only in the running server process.
// They disappear when the process restarts, is redeployed, or is replaced.
const visits: VisitEntry[] = []

export function recordVisit(entry: Omit<VisitEntry, 'id' | 'visitedAt'>) {
  visits.unshift({
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    visitedAt: new Date().toISOString(),
  })

  if (visits.length > MAX_VISITS) {
    visits.length = MAX_VISITS
  }
}

export function getRecentVisits() {
  return visits.slice()
}
