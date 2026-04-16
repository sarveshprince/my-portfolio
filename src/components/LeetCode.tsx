import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import type { LeetCodeApiResponse } from '../types'
import { Section } from './Section'

type StatsView = {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  streak: number
  recent: Array<{ title: string; titleSlug: string }>
}

const USERNAME = 'sarvesh__8228'
const LEETCODE_PROXY_ENDPOINT = `/api/leetcode?username=${USERNAME}`
const LEETCODE_CACHE_KEY = 'leetcode_proxy_cache_v1'
const REQUEST_TIMEOUT_MS = 6000

const DEFAULT_VIEW: StatsView = {
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  streak: 0,
  recent: [],
}

function getCountByDifficulty(
  list: Array<{ difficulty?: string; count?: number }> | undefined,
  difficulty: string,
): number {
  return list?.find((item) => item.difficulty === difficulty)?.count ?? 0
}

function normalizeApiResponse(payload: LeetCodeApiResponse): StatsView {
  const ac = payload.matchedUser?.submitStatsGlobal?.acSubmissionNum
  return {
    totalSolved: getCountByDifficulty(ac, 'All'),
    easySolved: getCountByDifficulty(ac, 'Easy'),
    mediumSolved: getCountByDifficulty(ac, 'Medium'),
    hardSolved: getCountByDifficulty(ac, 'Hard'),
    streak: payload.userProfileCalendar?.streak ?? 0,
    recent: (payload.recentAcSubmissionList ?? []).slice(0, 5).map((item) => ({
      title: item.title ?? 'Untitled',
      titleSlug: item.titleSlug ?? '#',
    })),
  }
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

function readCache(): StatsView | null {
  try {
    const raw = localStorage.getItem(LEETCODE_CACHE_KEY)
    return raw ? (JSON.parse(raw) as StatsView) : null
  } catch {
    return null
  }
}

function writeCache(value: StatsView) {
  localStorage.setItem(LEETCODE_CACHE_KEY, JSON.stringify(value))
}

export function LeetCode() {
  const [stats, setStats] = useState<StatsView>(DEFAULT_VIEW)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryTick, setRetryTick] = useState(0)

  useEffect(() => {
    let active = true

    const run = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetchWithTimeout(LEETCODE_PROXY_ENDPOINT, REQUEST_TIMEOUT_MS)
        if (!response.ok) throw new Error('Failed request')

        const payload = (await response.json()) as LeetCodeApiResponse
        const normalized = normalizeApiResponse(payload)

        if (!active) return
        setStats(normalized)
        writeCache(normalized)
      } catch {
        if (!active) return

        const cached = readCache()
        if (cached) {
          setStats(cached)
        } else {
          setStats(DEFAULT_VIEW)
        }
        setError('LeetCode stats temporarily unavailable')
      } finally {
        if (active) setLoading(false)
      }
    }

    run()

    return () => {
      active = false
    }
  }, [retryTick])

  const view = useMemo(() => stats, [stats])

  return (
    <Section id="leetcode" title="LeetCode" subtitle="Data served via backend proxy endpoint.">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/20 bg-white/70 dark:bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 ease-in-out"
      >
        {loading ? <p className="text-sm text-gray-600 dark:text-gray-400">Loading LeetCode stats...</p> : null}

        {!loading && error ? (
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <p className="text-sm text-amber-200">{error}</p>
            <button
              onClick={() => setRetryTick((prev) => prev + 1)}
              className="rounded-full border border-white/25 bg-white/70 dark:bg-white/10 px-3 py-1 text-xs font-medium text-gray-900 dark:text-white transition-all duration-300 ease-in-out hover:scale-105"
            >
              Retry
            </button>
          </div>
        ) : null}

        {!loading ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <StatCard label="Total Solved" value={view.totalSolved} />
              <StatCard label="Easy" value={view.easySolved} />
              <StatCard label="Medium" value={view.mediumSolved} />
              <StatCard label="Hard" value={view.hardSolved} />
              <StatCard label="Streak" value={view.streak} />
            </div>

            <div className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-4">
              <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Recent Accepted Submissions</p>
              {view.recent.length ? (
                <ul className="grid gap-2 text-sm text-gray-600 dark:text-gray-400">
                  {view.recent.map((item) => (
                    <li key={item.titleSlug} className="truncate">
                      {item.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">No recent submissions available.</p>
              )}
            </div>
          </div>
        ) : null}
      </motion.div>
    </Section>
  )
}

type StatCardProps = {
  label: string
  value: string | number
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateX: 4, rotateY: -4 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-4 transition-all duration-300 ease-in-out hover:shadow-[0_0_50px_rgba(59,130,246,0.25)]"
    >
      <p className="text-xs text-gray-600 dark:text-gray-400">{label}</p>
      <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{value}</p>
    </motion.div>
  )
}


