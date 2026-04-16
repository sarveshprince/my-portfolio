import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type Badge = {
  displayName: string
  icon: string
}

type RecentSubmission = {
  title: string
  titleSlug: string
  timestamp: string
}

type ContestPoint = {
  timestamp: number
  rating: number
}

type LeetCodeApiResponse = {
  username: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  streak: number
  badges: Badge[]
  recentSubmissions: RecentSubmission[]
  submissionCalendar: Record<string, number>
  contestRatingHistory: ContestPoint[]
}

type HeatPoint = {
  date: string
  count: number
}

const ENDPOINT = '/api/leetcode?username=sarvesh__8228'

export function LeetCodeDashboard() {
  const [data, setData] = useState<LeetCodeApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const run = async () => {
      try {
        setLoading(true)
        const response = await fetch(ENDPOINT, { signal: controller.signal })
        if (!response.ok) throw new Error('Request failed')
        const payload = (await response.json()) as LeetCodeApiResponse
        setData(payload)
        setError(false)
      } catch {
        if (!controller.signal.aborted) {
          setError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    run()

    return () => controller.abort()
  }, [])

  const stats = useMemo(() => {
    const total = data?.totalSolved ?? 0
    const easy = data?.easySolved ?? 0
    const medium = data?.mediumSolved ?? 0
    const hard = data?.hardSolved ?? 0

    return {
      total,
      easy,
      medium,
      hard,
      easyPct: total ? (easy / total) * 100 : 0,
      mediumPct: total ? (medium / total) * 100 : 0,
      hardPct: total ? (hard / total) * 100 : 0,
      streak: data?.streak ?? 0,
    }
  }, [data])

  const heatmap = useMemo<HeatPoint[]>(() => {
    const entries = Object.entries(data?.submissionCalendar ?? {})
      .map(([unix, count]) => {
        const date = new Date(Number(unix) * 1000)
        return {
          date: date.toISOString().slice(0, 10),
          count,
        }
      })
      .sort((a, b) => a.date.localeCompare(b.date))

    return entries.slice(-140)
  }, [data])

  const contestPoints = useMemo(() => data?.contestRatingHistory ?? [], [data])

  return (
    <section id="leetcode" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">LeetCode Analytics</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{data?.username ?? 'sarvesh__8228'}</p>
        <div className="mt-3 h-1 w-32 rounded-full bg-gradient-to-r from-blue-400 via-cyan-300 to-transparent" />
      </div>

      {loading ? <DashboardSkeleton /> : null}

      {!loading && error ? (
        <div className="grid gap-6">
          <Panel>
            <p className="text-sm text-rose-300">LeetCode data unavailable</p>
          </Panel>
          <DashboardSkeleton />
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="grid gap-6">
          <KpiGrid
            total={stats.total}
            easy={stats.easy}
            medium={stats.medium}
            hard={stats.hard}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel>
              <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">Radial Progress</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <RadialProgress label="Easy" value={stats.easyPct} color="#22c55e" />
                <RadialProgress label="Medium" value={stats.mediumPct} color="#eab308" />
                <RadialProgress label="Hard" value={stats.hardPct} color="#ef4444" />
              </div>
            </Panel>

            <Panel>
              <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">Distribution</h3>
              <ProgressBar label="Easy" value={stats.easyPct} color="bg-green-500" />
              <ProgressBar label="Medium" value={stats.mediumPct} color="bg-yellow-500" />
              <ProgressBar label="Hard" value={stats.hardPct} color="bg-red-500" />
            </Panel>
          </div>

          <Panel>
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-6 shadow-[0_0_40px_rgba(251,191,36,0.25)]"
            >
              <p className="text-sm uppercase tracking-wider text-amber-200">Current Streak</p>
              <p className="mt-2 text-4xl font-semibold text-gray-900 dark:text-white">{stats.streak} days</p>
            </motion.div>
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Badges</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(data?.badges ?? []).map((badge) => (
                  <motion.div
                    key={badge.displayName}
                    whileHover={{ scale: 1.05, rotate: -1 }}
                    className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-3"
                  >
                    <img src={badge.icon} alt={badge.displayName} loading="lazy" className="mx-auto h-10 w-10 object-contain" />
                    <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-400">{badge.displayName}</p>
                  </motion.div>
                ))}
                {!(data?.badges?.length) ? <p className="text-sm text-gray-600 dark:text-gray-400">No badges found.</p> : null}
              </div>
            </Panel>

            <Panel>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Recent Submissions</h3>
              <div className="grid gap-3">
                {(data?.recentSubmissions ?? []).slice(0, 5).map((submission) => (
                  <motion.a
                    key={`${submission.titleSlug}-${submission.timestamp}`}
                    href={`https://leetcode.com/problems/${submission.titleSlug}`}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.01, rotateX: 2, rotateY: -2 }}
                    className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-3 transition-all duration-300 ease-in-out"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{submission.title}</p>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{formatTimestamp(submission.timestamp)}</p>
                  </motion.a>
                ))}
                {!(data?.recentSubmissions?.length) ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">No recent submissions available.</p>
                ) : null}
              </div>
            </Panel>
          </div>

          <Panel>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Submission Heatmap</h3>
            <HeatmapGrid points={heatmap} />
          </Panel>

          <Panel>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Contest Rating History</h3>
            <ContestLineChart points={contestPoints} />
          </Panel>
        </div>
      ) : null}
    </section>
  )
}

function KpiGrid({ total, easy, medium, hard }: { total: number; easy: number; medium: number; hard: number }) {
  const items = [
    { label: 'Total Solved', value: total },
    { label: 'Easy', value: easy },
    { label: 'Medium', value: medium },
    { label: 'Hard', value: hard },
  ]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((item) => (
        <motion.div
          key={item.label}
          variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          whileHover={{ scale: 1.03, rotateX: 3, rotateY: -3 }}
        >
          <Panel>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              <CountUp target={item.value} />
            </p>
          </Panel>
        </motion.div>
      ))}
    </motion.div>
  )
}

function RadialProgress({ label, value, color }: { label: string; value: number; color: string }) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference

  return (
    <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-4 text-center">
      <svg width="100" height="100" className="mx-auto -rotate-90">
        <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.18)" strokeWidth="8" fill="transparent" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          strokeDasharray={circumference}
        />
      </svg>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{value.toFixed(1)}%</p>
    </motion.div>
  )
}

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-1 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>{label}</span>
        <span>{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/70 dark:bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className={`h-2 rounded-full ${color}`}
        />
      </div>
    </div>
  )
}

function HeatmapGrid({ points }: { points: HeatPoint[] }) {
  const max = Math.max(1, ...points.map((p) => p.count))

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[700px] gap-1" style={{ gridTemplateColumns: 'repeat(28, minmax(0, 1fr))' }}>
        {points.map((point) => {
          const intensity = point.count / max
          return (
            <div
              key={point.date}
              title={`${point.date}: ${point.count} submissions`}
              className="h-4 w-full rounded-[4px] border border-white/10"
              style={{
                backgroundColor: `rgba(59,130,246,${0.1 + intensity * 0.9})`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

function ContestLineChart({ points }: { points: ContestPoint[] }) {
  if (!points.length) {
    return <p className="text-sm text-gray-600 dark:text-gray-400">No contest history available.</p>
  }

  const width = 900
  const height = 280
  const padX = 36
  const padY = 20

  const maxRating = Math.max(...points.map((p) => p.rating))
  const minRating = Math.min(...points.map((p) => p.rating))
  const range = Math.max(1, maxRating - minRating)

  const coords = points.map((p, i) => {
    const x = padX + (i / Math.max(1, points.length - 1)) * (width - padX * 2)
    const y = height - padY - ((p.rating - minRating) / range) * (height - padY * 2)
    return { x, y }
  })

  const d = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[280px] min-w-[700px] w-full">
        <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="rgba(255,255,255,0.2)" />
        <line x1={padX} y1={padY} x2={padX} y2={height - padY} stroke="rgba(255,255,255,0.2)" />

        <motion.path
          d={d}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {coords.map((c, idx) => (
          <circle key={idx} cx={c.x} cy={c.y} r="3" fill="#93c5fd" />
        ))}
      </svg>
    </div>
  )
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/70 dark:bg-white/10 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out">
      {children}
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Panel key={idx}>
            <div className="h-4 w-24 animate-pulse rounded bg-white/15" />
            <div className="mt-3 h-8 w-20 animate-pulse rounded bg-white/20" />
          </Panel>
        ))}
      </div>
      <Panel>
        <div className="h-44 animate-pulse rounded-xl bg-white/70 dark:bg-white/10" />
      </Panel>
      <Panel>
        <div className="h-52 animate-pulse rounded-xl bg-white/70 dark:bg-white/10" />
      </Panel>
    </div>
  )
}

function CountUp({ target }: { target: number }) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(motionValue, target, {
      duration: 1.2,
      ease: 'easeOut',
    })
    const unsubscribe = rounded.on('change', (v) => setDisplay(v))

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [motionValue, rounded, target])

  return <>{display}</>
}

function formatTimestamp(ts: string) {
  const date = new Date(Number(ts) * 1000)
  if (Number.isNaN(date.getTime())) return 'Unknown date'
  return date.toLocaleString()
}



