export const profiles = ['Youth Athlete', 'High School Athlete', 'College Athlete', 'Parent', 'Coach', 'Beginner Fan', 'Casual Fan', 'Super Fan'] as const
export const leagueNames = ['NCAA D1', 'NCAA D2', 'NCAA D3', 'LOVB', 'MLV'] as const

export type Profile = (typeof profiles)[number]
export type LeagueName = (typeof leagueNames)[number]

export type Preferences = {
  email: string
  profile: Profile
  leagues: LeagueName[]
}

export type LeagueData = {
  name: LeagueName
  slug: string
  detail: string
  tone: string
  scores: { matchup: string; result: string; status: string }[]
  schedules: { date: string; matchup: string; venue: string }[]
  standings: { team: string; record: string; points: string }[]
  news: { title: string; source: string; age: string }[]
}
