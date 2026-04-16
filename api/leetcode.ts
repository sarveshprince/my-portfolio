const LEETCODE_GRAPHQL_QUERY = `query getLeetCodeData($username: String!) {
matchedUser(username: $username) {
username
submitStatsGlobal {
acSubmissionNum {
difficulty
count
}
}
badges {
displayName
icon
}
}
recentAcSubmissionList(username: $username, limit: 5) {
title
titleSlug
timestamp
}
userProfileCalendar(username: $username) {
streak
}
}`

type Req = {
  method?: string
  query?: { username?: string }
}

type Res = {
  status: (code: number) => Res
  json: (payload: unknown) => void
}

type GraphResponse = {
  data?: {
    matchedUser?: {
      username?: string
      submitStatsGlobal?: {
        acSubmissionNum?: Array<{ difficulty?: string; count?: number }>
      }
      badges?: Array<{ displayName?: string; icon?: string }>
    }
    recentAcSubmissionList?: Array<{ title?: string; titleSlug?: string; timestamp?: string }>
    userProfileCalendar?: {
      streak?: number
      submissionCalendar?: string
    }
    userContestRankingHistory?: Array<{
      rating?: number
      attended?: boolean
      contest?: { startTime?: number }
    }>
  }
}

function getCount(list: Array<{ difficulty?: string; count?: number }> | undefined, key: string): number {
  return list?.find((item) => item.difficulty === key)?.count ?? 0
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const username = req.query?.username ?? 'sarvesh__8228'

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: LEETCODE_GRAPHQL_QUERY,
        variables: { username },
      }),
    })

    if (!response.ok) {
      throw new Error('LeetCode request failed')
    }

    const payload = (await response.json()) as GraphResponse
    const matched = payload.data?.matchedUser
    const acSubmissionNum = matched?.submitStatsGlobal?.acSubmissionNum

    const calendarRaw = payload.data?.userProfileCalendar?.submissionCalendar
    const parsedCalendar = calendarRaw ? (JSON.parse(calendarRaw) as Record<string, number>) : {}

    const contestRatingHistory = (payload.data?.userContestRankingHistory ?? [])
      .filter((entry) => entry.attended)
      .map((entry) => ({
        timestamp: entry.contest?.startTime ?? 0,
        rating: entry.rating ?? 0,
      }))

    res.status(200).json({
      username: matched?.username ?? username,
      totalSolved: getCount(acSubmissionNum, 'All'),
      easySolved: getCount(acSubmissionNum, 'Easy'),
      mediumSolved: getCount(acSubmissionNum, 'Medium'),
      hardSolved: getCount(acSubmissionNum, 'Hard'),
      streak: payload.data?.userProfileCalendar?.streak ?? 0,
      badges: (matched?.badges ?? []).map((badge) => ({
        displayName: badge.displayName ?? 'Badge',
        icon: badge.icon ?? '',
      })),
      recentSubmissions: (payload.data?.recentAcSubmissionList ?? []).map((sub) => ({
        title: sub.title ?? 'Untitled',
        titleSlug: sub.titleSlug ?? '#',
        timestamp: sub.timestamp ?? '0',
      })),
      submissionCalendar: parsedCalendar,
      contestRatingHistory,
    })
  } catch {
    res.status(500).json({ error: 'LeetCode data unavailable' })
  }
}