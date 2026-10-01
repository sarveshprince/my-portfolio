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
  upcoming?: boolean
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

type ContestRanking = {
  attendedContests: number
  rating: number
  globalRanking: number
  topPercentage: number
}

type LeetCodeApiResponse = {
  username: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  totalQuestions: number
  streak: number
  badges: Badge[]
  recentSubmissions: RecentSubmission[]
  submissionCalendar: Record<string, number>
  contestRatingHistory: ContestPoint[]
  contestRanking: ContestRanking | null
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
        if (!controller.signal.aborted) setError(true)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
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
    const totalQ = data?.totalQuestions ?? 0

    return {
      total,
      easy,
      medium,
      hard,
      totalQ,
      easyPct: total ? (easy / total) * 100 : 0,
      mediumPct: total ? (medium / total) * 100 : 0,
      hardPct: total ? (hard / total) * 100 : 0,
      solvedPct: totalQ ? (total / totalQ) * 100 : 0,
      streak: data?.streak ?? 0,
    }
  }, [data])

  const heatmap = useMemo<HeatPoint[]>(() => {
    const entries = Object.entries(data?.submissionCalendar ?? {})
      .map(([unix, count]) => {
        const date = new Date(Number(unix) * 1000)
        return { date: date.toISOString().slice(0, 10), count }
      })
      .sort((a, b) => a.date.localeCompare(b.date))
    return entries.slice(-140)
  }, [data])

  const contestPoints = useMemo(() => data?.contestRatingHistory ?? [], [data])

  return (
    <section id="leetcode" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            LeetCode Analytics
          </h2>
          <a
            href={`https://leetcode.com/${data?.username ?? 'sarvesh__8228'}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-400 hover:underline"
          >
            @{data?.username ?? 'sarvesh__8228'} ↗
          </a>
        </div>
        <div className="mt-3 h-1 w-32 rounded-full bg-gradient-to-r from-blue-400 via-cyan-300 to-transparent" />
      </div>

      {loading ? <DashboardSkeleton /> : null}

      {!loading && error ? (
        <div className="grid gap-6">
          <Panel>
            <div className="flex flex-col items-center gap-2 py-4">
              <p className="text-sm text-rose-400">⚠ LeetCode data unavailable</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Make sure the API server is running: <code className="text-blue-400">npm run dev:full</code>
              </p>
            </div>
          </Panel>
          <DashboardSkeleton />
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="grid gap-6">
          {/* KPI Cards */}
          <KpiGrid
            total={stats.total}
            easy={stats.easy}
            medium={stats.medium}
            hard={stats.hard}
            totalQ={stats.totalQ}
            streak={stats.streak}
          />

          {/* Contest Ranking Banner */}
          {data?.contestRanking ? (
            <ContestBanner ranking={data.contestRanking} />
          ) : null}

          {/* Progress bars + radial */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel>
              <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">Difficulty Breakdown</h3>
              <div className="mb-4">
                <div className="mb-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Overall Progress</span>
                  <span>{stats.total} / {stats.totalQ}</span>
                </div>
                <div className="h-2 rounded-full bg-white/90 dark:bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(100, stats.solvedPct)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                </div>
              </div>
              <ProgressBar label="Easy" value={stats.easyPct} color="bg-green-500" count={stats.easy} />
              <ProgressBar label="Medium" value={stats.mediumPct} color="bg-yellow-500" count={stats.medium} />
              <ProgressBar label="Hard" value={stats.hardPct} color="bg-red-500" count={stats.hard} />
            </Panel>

            <Panel>
              <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">Radial Progress</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <RadialProgress label="Easy" value={stats.easyPct} color="#22c55e" count={stats.easy} />
                <RadialProgress label="Medium" value={stats.mediumPct} color="#eab308" count={stats.medium} />
                <RadialProgress label="Hard" value={stats.hardPct} color="#ef4444" count={stats.hard} />
              </div>
            </Panel>
          </div>

          {/* Streak */}
          <Panel>
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-6 shadow-[0_0_40px_rgba(251,191,36,0.25)]"
            >
              <p className="text-sm uppercase tracking-wider text-amber-400">🔥 Current Streak</p>
              <p className="mt-2 text-5xl font-bold text-gray-900 dark:text-white">
                {stats.streak} <span className="text-2xl font-normal text-gray-500 dark:text-gray-400">days</span>
              </p>
            </motion.div>
          </Panel>

          {/* Badges + Recent Submissions */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Badges</h3>
              {(data?.badges ?? []).length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">No badges yet.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {(data?.badges ?? []).map((badge) => (
                    <motion.div
                      key={badge.displayName}
                      whileHover={{ scale: 1.05, rotate: -1 }}
                      className={`relative overflow-hidden rounded-xl border p-3 transition-all duration-300 ${
                        badge.upcoming
                          ? 'border-dashed border-gray-300/50 bg-white/30 dark:border-white/10 dark:bg-white/5 opacity-60'
                          : 'border-gray-200 bg-white/80 dark:border-white/20 dark:bg-white/10'
                      }`}
                    >
                      <img
                        src={badge.icon}
                        alt={badge.displayName}
                        loading="lazy"
                        className="mx-auto h-10 w-10 object-contain"
                      />
                      <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-400">
                        {badge.displayName}
                      </p>
                      {badge.upcoming && (
                        <span className="absolute right-1 top-1 rounded bg-amber-500/20 px-1 text-[9px] text-amber-400">
                          soon
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </Panel>

            <Panel>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Recent Accepted</h3>
              <div className="grid gap-3">
                {(data?.recentSubmissions ?? []).slice(0, 6).map((sub) => (
                  <motion.a
                    key={`${sub.titleSlug}-${sub.timestamp}`}
                    href={`https://leetcode.com/problems/${sub.titleSlug}`}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/60 px-4 py-3 transition-all hover:border-blue-400/50 hover:shadow-md dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-xs">✓</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{sub.title}</p>
                    </div>
                    <p className="shrink-0 text-xs text-gray-500 dark:text-gray-400">{formatTimestamp(sub.timestamp)}</p>
                  </motion.a>
                ))}
                {!(data?.recentSubmissions?.length) ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No recent submissions.</p>
                ) : null}
              </div>
            </Panel>
          </div>

          {/* Heatmap */}
          <Panel>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Submission Heatmap</h3>
            <HeatmapGrid points={heatmap} />
          </Panel>

          {/* Contest Rating */}
          <Panel>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Contest Rating History</h3>
            <ContestLineChart points={contestPoints} />
          </Panel>
        </div>
      ) : null}
    </section>
  )
}

// ─── KPI Grid ────────────────────────────────────────────────────────────────

function KpiGrid({
  total,
  easy,
  medium,
  hard,
  totalQ,
  streak,
}: {
  total: number
  easy: number
  medium: number
  hard: number
  totalQ: number
  streak: number
}) {
  const items = [
    { label: 'Total Solved', value: total, sub: `of ${totalQ}`, color: 'from-blue-500/20 to-cyan-500/10' },
    { label: 'Easy', value: easy, color: 'from-green-500/20 to-emerald-500/10' },
    { label: 'Medium', value: medium, color: 'from-yellow-500/20 to-amber-500/10' },
    { label: 'Hard', value: hard, color: 'from-red-500/20 to-rose-500/10' },
    { label: 'Streak', value: streak, sub: 'days 🔥', color: 'from-amber-500/20 to-orange-500/10' },
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
      className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5"
    >
      {items.map((item) => (
        <motion.div
          key={item.label}
          variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          whileHover={{ scale: 1.03, rotateX: 3, rotateY: -3 }}
        >
          <Panel>
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-60`} />
            <div className="relative">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                <CountUp target={item.value} />
              </p>
              {item.sub ? (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.sub}</p>
              ) : null}
            </div>
          </Panel>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─── Contest Banner ──────────────────────────────────────────────────────────

function ContestBanner({ ranking }: { ranking: ContestRanking }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-4 sm:grid-cols-4"
    >
      {[
        { label: 'Contest Rating', value: ranking.rating.toString(), icon: '⭐' },
        { label: 'Contests', value: ranking.attendedContests.toString(), icon: '🏆' },
        { label: 'Global Rank', value: `#${ranking.globalRanking.toLocaleString()}`, icon: '🌍' },
        { label: 'Top %', value: `${ranking.topPercentage.toFixed(1)}%`, icon: '📈' },
      ].map((item) => (
        <Panel key={item.label}>
          <p className="text-lg">{item.icon}</p>
          <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">{item.value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
        </Panel>
      ))}
    </motion.div>
  )
}

// ─── Radial Progress ─────────────────────────────────────────────────────────

function RadialProgress({
  label,
  value,
  color,
  count,
}: {
  label: string
  value: number
  color: string
  count: number
}) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 p-4 text-center backdrop-blur-2xl dark:border-white/20 dark:bg-white/10"
    >
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
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-lg font-bold text-gray-900 dark:text-white">{count}</p>
      <p className="text-xs text-gray-400">{value.toFixed(1)}%</p>
    </motion.div>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({
  label,
  value,
  color,
  count,
}: {
  label: string
  value: number
  color: string
  count: number
}) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="text-gray-900 dark:text-white font-medium">{count} <span className="text-xs text-gray-400">({value.toFixed(1)}%)</span></span>
      </div>
      <div className="h-2 rounded-full bg-white/90 dark:bg-white/10">
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

// ─── Heatmap ─────────────────────────────────────────────────────────────────

function HeatmapGrid({ points }: { points: HeatPoint[] }) {
  const max = Math.max(1, ...points.map((p) => p.count))

  // Month labels
  const months: { label: string; col: number }[] = []
  let lastMonth = -1
  points.forEach((p, i) => {
    const month = new Date(p.date).getMonth()
    if (month !== lastMonth) {
      months.push({ label: new Date(p.date).toLocaleString('default', { month: 'short' }), col: i + 1 })
      lastMonth = month
    }
  })

  return (
    <div className="overflow-x-auto">
      {/* Month labels */}
      <div
        className="mb-1 grid min-w-[700px] text-[10px] text-gray-400"
        style={{ gridTemplateColumns: `repeat(${points.length}, minmax(0, 1fr))` }}
      >
        {points.map((_, i) => {
          const m = months.find((m) => m.col === i + 1)
          return <div key={i}>{m ? m.label : ''}</div>
        })}
      </div>
      {/* Cells */}
      <div
        className="grid min-w-[700px] gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${Math.min(points.length, 52)}, minmax(0, 1fr))` }}
      >
        {points.map((point) => {
          const intensity = point.count / max
          return (
            <div
              key={point.date}
              title={`${point.date}: ${point.count} submissions`}
              className="h-[14px] w-full rounded-[3px] border border-white/5 transition-transform hover:scale-125"
              style={{
                backgroundColor: point.count === 0
                  ? 'rgba(255,255,255,0.05)'
                  : `rgba(59,130,246,${0.15 + intensity * 0.85})`,
              }}
            />
          )
        })}
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
        <span>Less</span>
        {[0.05, 0.25, 0.5, 0.75, 1].map((v) => (
          <div
            key={v}
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: v === 0.05 ? 'rgba(255,255,255,0.05)' : `rgba(59,130,246,${v})` }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}

// ─── Contest Line Chart ───────────────────────────────────────────────────────

function ContestLineChart({ points }: { points: ContestPoint[] }) {
  if (!points.length) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">No contest history available.</p>
  }

  const width = 900
  const height = 280
  const padX = 48
  const padY = 24

  const maxRating = Math.max(...points.map((p) => p.rating))
  const minRating = Math.min(...points.map((p) => p.rating))
  const range = Math.max(1, maxRating - minRating)

  const coords = points.map((p, i) => ({
    x: padX + (i / Math.max(1, points.length - 1)) * (width - padX * 2),
    y: height - padY - ((p.rating - minRating) / range) * (height - padY * 2),
    rating: p.rating,
    timestamp: p.timestamp,
  }))

  const d = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')

  // Fill area
  const fillD = `${d} L ${coords[coords.length - 1].x} ${height - padY} L ${coords[0].x} ${height - padY} Z`

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[280px] min-w-[700px] w-full">
        <defs>
          <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = padY + t * (height - padY * 2)
          const ratingLabel = Math.round(maxRating - t * range)
          return (
            <g key={t}>
              <line x1={padX} y1={y} x2={width - padX} y2={y} stroke="rgba(255,255,255,0.07)" />
              <text x={padX - 4} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="11">
                {ratingLabel}
              </text>
            </g>
          )
        })}

        {/* Axes */}
        <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="rgba(255,255,255,0.2)" />
        <line x1={padX} y1={padY} x2={padX} y2={height - padY} stroke="rgba(255,255,255,0.2)" />

        {/* Fill */}
        <motion.path
          d={fillD}
          fill="url(#ratingGrad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
        />

        {/* Line */}
        <motion.path
          d={d}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {/* Data points */}
        {coords.map((c, idx) => (
          <g key={idx}>
            <circle cx={c.x} cy={c.y} r="5" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="2" />
            <title>{`Rating: ${c.rating.toFixed(0)} — ${new Date(c.timestamp * 1000).toLocaleDateString()}`}</title>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ─── Panel ────────────────────────────────────────────────────────────────────

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white/90 via-white/70 to-white/50 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] dark:border-white/20 dark:from-white/10 dark:via-white/5 dark:to-transparent dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]">
      {children}
    </div>
  )
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Panel key={idx}>
            <div className="h-3 w-20 animate-pulse rounded bg-white/30 dark:bg-white/15" />
            <div className="mt-3 h-8 w-16 animate-pulse rounded bg-white/40 dark:bg-white/20" />
          </Panel>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Panel key={idx}>
            <div className="h-3 w-16 animate-pulse rounded bg-white/30 dark:bg-white/15" />
            <div className="mt-3 h-6 w-12 animate-pulse rounded bg-white/40 dark:bg-white/20" />
          </Panel>
        ))}
      </div>
      <Panel>
        <div className="h-44 animate-pulse rounded-xl bg-white/90 dark:bg-white/10" />
      </Panel>
      <Panel>
        <div className="h-52 animate-pulse rounded-xl bg-white/90 dark:bg-white/10" />
      </Panel>
    </div>
  )
}

// ─── Count Up ────────────────────────────────────────────────────────────────

function CountUp({ target }: { target: number }) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(motionValue, target, { duration: 1.2, ease: 'easeOut' })
    const unsubscribe = rounded.on('change', (v) => setDisplay(v))
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [motionValue, rounded, target])

  return <>{display}</>
}

// ─── Format Timestamp ─────────────────────────────────────────────────────────

function formatTimestamp(ts: string) {
  const date = new Date(Number(ts) * 1000)
  if (Number.isNaN(date.getTime())) return 'Unknown'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
