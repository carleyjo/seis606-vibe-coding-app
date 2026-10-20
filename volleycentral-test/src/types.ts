export const profiles = ['Youth Athlete', 'High School Athlete', 'College Athlete', 'Parent', 'Coach', 'Beginner Fan', 'Casual Fan', 'Super Fan'] as const
export const leagueNames = ['NCAA D1', 'NCAA D2', 'NCAA D3', 'LOVB', 'MLV'] as const

export type Profile = (typeof profiles)[number]
export type LeagueName = (typeof leagueNames)[number]

export type Preferences = {
  profile: Profile
  leagues: LeagueName[]
}

export type LeagueData = {
  name: LeagueName
  slug: string
  detail: string
  tone: string
  scores: Score[]
  schedules: Schedule[]
  standings: Standing[]
  news: NewsItem[]
  fetchedAt: string
  source: 'provider' | 'sample'
}

export type Score = {
  id: string
  matchup: string
  result: string
  status: string
  homeTeam: string
  awayTeam: string
  homeSets?: number
  awaySets?: number
}

export type Schedule = {
  id: string
  date: string
  matchup: string
  venue: string
  whereToWatch: string
  homeTeam: string
  awayTeam: string
}

export type Standing = {
  team: string
  record: string
  points: string
  rank: number
}

export type NewsItem = {
  title: string
  source: string
  age: string
  url?: string
}
