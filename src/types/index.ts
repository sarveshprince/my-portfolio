export type SkillCategory = {
  title: string
  icon: 'code' | 'database' | 'cpu'
  skills: string[]
}

export type Project = {
  title: string
  description: string
  features: string[]
  tech: string[]
  image: string
  github: string
}

export type Achievement = {
  title: string
  subtitle: string
  note: string
}

export type Certification = {
  title: string
  organization: string
  link: string
}

export type LeetCodeApiResponse = {
  matchedUser?: {
    username?: string
    submitStatsGlobal?: {
      acSubmissionNum?: Array<{
        difficulty?: string
        count?: number
      }>
    }
    badges?: Array<{
      displayName?: string
      icon?: string
    }>
  }
  recentAcSubmissionList?: Array<{
    title?: string
    titleSlug?: string
    timestamp?: string
  }>
  userProfileCalendar?: {
    streak?: number
  }
}