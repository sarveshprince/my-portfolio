import { LeetCode } from 'leetcode-query'

const lc = new LeetCode()

function computeStreak(calendarJson: string): number {
  const calendar: Record<string, number> = JSON.parse(calendarJson || '{}')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

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

type Req = {
  method?: string
  query?: { username?: string }
}

type Res = {
  status: (code: number) => Res
  json: (payload: unknown) => void
  setHeader?: (key: string, value: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  res.setHeader?.('Access-Control-Allow-Origin', '*')

  const username = req.query?.username ?? 'sarvesh__8228'

  try {
    const [user, contestInfo] = await Promise.all([
      lc.user(username),
      lc.user_contest_info(username).catch(() => null),
    ])

    const matched = (user as AnyRecord)?.matchedUser
    const stats: Array<{ difficulty: string; count: number }> =
      matched?.submitStats?.acSubmissionNum ?? []

    const getCount = (diff: string) =>
      stats.find((s) => s.difficulty === diff)?.count ?? 0

    const calendarRaw: string = matched?.submissionCalendar ?? '{}'
    const parsedCalendar: Record<string, number> = JSON.parse(calendarRaw)

    const oneYearAgo = Date.now() / 1000 - 365 * 86400
    const filteredCalendar = Object.fromEntries(
      Object.entries(parsedCalendar).filter(([ts]) => Number(ts) > oneYearAgo),
    )

    const streak = computeStreak(calendarRaw)

    const contestRatingHistory = ((contestInfo as AnyRecord)?.userContestRankingHistory ?? [])
      .filter((e: AnyRecord) => e.attended)
      .map((e: AnyRecord) => ({
        timestamp: e.contest?.startTime ?? 0,
        rating: e.rating ?? 0,
      }))

    const contestRanking = (contestInfo as AnyRecord)?.userContestRanking
      ? {
          attendedContests:
            (contestInfo as AnyRecord).userContestRanking.attendedContestsCount ?? 0,
          rating: Math.round((contestInfo as AnyRecord).userContestRanking.rating ?? 0),
          globalRanking: (contestInfo as AnyRecord).userContestRanking.globalRanking ?? 0,
          topPercentage: (contestInfo as AnyRecord).userContestRanking.topPercentage ?? 0,
        }
      : null

    const recentSubmissions = ((user as AnyRecord)?.recentSubmissionList ?? [])
      .filter((s: AnyRecord) => s.statusDisplay === 'Accepted')
      .slice(0, 10)
      .map((s: AnyRecord) => ({
        title: s.title ?? 'Untitled',
        titleSlug: s.titleSlug ?? '#',
        timestamp: s.timestamp ?? '0',
      }))

    const badges = [
      ...((matched?.badges ?? []) as AnyRecord[]),
      ...((matched?.upcomingBadges ?? []) as AnyRecord[]).map((b) => ({
        displayName: b.name,
        icon: `https://leetcode.com${b.icon}`,
        upcoming: true,
      })),
    ].map((b) => ({
      displayName: b.displayName ?? b.name ?? 'Badge',
      icon: b.icon ?? '',
      upcoming: b.upcoming ?? false,
    }))

    res.status(200).json({
      username: matched?.username ?? username,
      totalSolved: getCount('All'),
      easySolved: getCount('Easy'),
      mediumSolved: getCount('Medium'),
      hardSolved: getCount('Hard'),
      totalQuestions:
        ((user as AnyRecord)?.allQuestionsCount?.find(
          (q: AnyRecord) => q.difficulty === 'All',
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
}