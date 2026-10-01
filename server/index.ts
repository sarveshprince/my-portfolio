import express from 'express'
import { LeetCode } from 'leetcode-query'

const app = express()
const PORT = 3001
const lc = new LeetCode()

// ─── Streak helper ───────────────────────────────────────────────────────────

function computeStreak(calendarJson: string): number {
  const calendar: Record<string, number> = JSON.parse(calendarJson || '{}')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Build a Set of date strings "YYYY-MM-DD" that had submissions
  const activeDays = new Set(
    Object.keys(calendar).map((ts) => {
      const d = new Date(Number(ts) * 1000)
      return d.toISOString().slice(0, 10)
    }),
  )

  let streak = 0
  const cursor = new Date(today)

  for (let i = 0; i < 400; i++) {
    const key = cursor.toISOString().slice(0, 10)
    if (activeDays.has(key)) {
      streak++
    } else {
      // Allow today to be empty (streak not yet broken)
      if (i === 0) {
        cursor.setDate(cursor.getDate() - 1)
        continue
      }
      break
    }
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}

// ─── Route ───────────────────────────────────────────────────────────────────

app.get('/api/leetcode', async (req, res) => {
  const username = (req.query.username as string) || 'sarvesh__8228'

  try {
    // Run profile and contest queries concurrently
    const [user, contestInfo] = await Promise.all([
      lc.user(username),
      lc.user_contest_info(username).catch(() => null),
    ])

    const matched = user?.matchedUser
    const stats = matched?.submitStats?.acSubmissionNum ?? []

    const getCount = (diff: string) =>
      stats.find((s: { difficulty: string; count: number }) => s.difficulty === diff)?.count ?? 0

    const calendarRaw = matched?.submissionCalendar ?? '{}'
    const parsedCalendar: Record<string, number> = JSON.parse(calendarRaw)

    // Only keep last 365 days of calendar for heatmap
    const oneYearAgo = Date.now() / 1000 - 365 * 86400
    const filteredCalendar = Object.fromEntries(
      Object.entries(parsedCalendar).filter(([ts]) => Number(ts) > oneYearAgo),
    )

    const streak = computeStreak(calendarRaw)

    // Contest rating history
    const contestRatingHistory = (contestInfo?.userContestRankingHistory ?? [])
      .filter((e: { attended: boolean }) => e.attended)
      .map((e: { contest: { startTime: number }; rating: number }) => ({
        timestamp: e.contest?.startTime ?? 0,
        rating: e.rating ?? 0,
      }))

    // Contest ranking summary
    const contestRanking = contestInfo?.userContestRanking
      ? {
          attendedContests: contestInfo.userContestRanking.attendedContestsCount ?? 0,
          rating: Math.round(contestInfo.userContestRanking.rating ?? 0),
          globalRanking: contestInfo.userContestRanking.globalRanking ?? 0,
          topPercentage: contestInfo.userContestRanking.topPercentage ?? 0,
        }
      : null

    // Recent accepted submissions (filter only Accepted)
    const recentSubmissions = (user?.recentSubmissionList ?? [])
      .filter((s: { statusDisplay: string }) => s.statusDisplay === 'Accepted')
      .slice(0, 10)
      .map((s: { title: string; titleSlug: string; timestamp: string }) => ({
        title: s.title ?? 'Untitled',
        titleSlug: s.titleSlug ?? '#',
        timestamp: s.timestamp ?? '0',
      }))

    // Badges (upcoming badges count as future achievements)
    const badges = [
      ...(matched?.badges ?? []),
      ...(matched?.upcomingBadges ?? []).map((b: { name: string; icon: string }) => ({
        displayName: b.name,
        icon: `https://leetcode.com${b.icon}`,
        upcoming: true,
      })),
    ].map((b: { displayName?: string; name?: string; icon?: string; upcoming?: boolean }) => ({
      displayName: b.displayName ?? b.name ?? 'Badge',
      icon: b.icon ?? '',
      upcoming: b.upcoming ?? false,
    }))

    res.json({
      username: matched?.username ?? username,
      totalSolved: getCount('All'),
      easySolved: getCount('Easy'),
      mediumSolved: getCount('Medium'),
      hardSolved: getCount('Hard'),
      totalQuestions: (user?.allQuestionsCount?.find(
        (q: { difficulty: string }) => q.difficulty === 'All',
      )?.count) ?? 0,
      streak,
      badges,
      recentSubmissions,
      submissionCalendar: filteredCalendar,
      contestRatingHistory,
      contestRanking,
    })
  } catch (err) {
    console.error('[leetcode-api]', err)
    res.status(500).json({ error: 'LeetCode data unavailable' })
  }
})

app.listen(PORT, () => {
  console.log(`  ✅ LeetCode API server → http://localhost:${PORT}`)
})
