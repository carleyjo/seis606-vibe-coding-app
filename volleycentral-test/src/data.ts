import type { LeagueData, LeagueName } from './types'

const sampleScores = (label: string) => [
  { id: `${label}-score-1`, matchup: `${label} Sample Team A 2  ·  ${label} Sample Team B 2`, result: 'Set 5', status: 'Live today', homeTeam: `${label} Sample Team A`, awayTeam: `${label} Sample Team B`, homeSets: 2, awaySets: 2 },
  { id: `${label}-score-2`, matchup: `${label} Sample Team C 3  ·  ${label} Sample Team D 1`, result: 'Final today', status: 'Today', homeTeam: `${label} Sample Team C`, awayTeam: `${label} Sample Team D`, homeSets: 3, awaySets: 1 },
  { id: `${label}-score-3`, matchup: `${label} Sample Team E  ·  ${label} Sample Team F`, result: 'Upcoming today', status: 'Today', homeTeam: `${label} Sample Team E`, awayTeam: `${label} Sample Team F` },
]

const sampleSchedules = (label: string) => [
  { id: `${label}-schedule-1`, date: 'Today', matchup: `${label} Sample Team E vs ${label} Sample Team F`, venue: 'Sample Arena', whereToWatch: 'Sample listing: check official site', homeTeam: `${label} Sample Team E`, awayTeam: `${label} Sample Team F` },
  { id: `${label}-schedule-2`, date: 'Tomorrow', matchup: `${label} Sample Team G vs ${label} Sample Team H`, venue: 'Sample Events Center', whereToWatch: 'Sample listing: check official site', homeTeam: `${label} Sample Team G`, awayTeam: `${label} Sample Team H` },
]

const sampleStandings = (label: string) => Array.from({ length: 10 }, (_, index) => ({
  rank: index + 1, team: `${label} Sample Team ${String(index + 1).padStart(2, '0')}`,
  record: `${19 - index}-${index + 1}`,
  points: `${570 - index * 24}`,
}))

const sampleNews = (label: string) => [
  { title: `${label} sample news item one`, source: 'Official sample source', age: 'This week' },
  { title: `${label} sample news item two`, source: 'Official sample source', age: 'This week' },
  { title: `${label} sample news item three`, source: 'Official sample source', age: 'This week' },
]

function makeLeague(name: LeagueName, slug: string, detail: string, tone: string): LeagueData {
  return { name, slug, detail, tone, scores: sampleScores(name), schedules: sampleSchedules(name), standings: sampleStandings(name), news: sampleNews(name), fetchedAt: new Date(0).toISOString(), source: 'sample' }
}

export const leagueData: Record<LeagueName, LeagueData> = {
  'NCAA D1': makeLeague('NCAA D1', 'ncaa-d1', 'The highest level of college volleyball', 'coral'),
  'NCAA D2': makeLeague('NCAA D2', 'ncaa-d2', 'Big matchups, bigger stories', 'pink'),
  'NCAA D3': makeLeague('NCAA D3', 'ncaa-d3', 'The game, played with purpose', 'lavender'),
  LOVB: makeLeague('LOVB', 'lovb', 'The next generation of pro', 'sun'),
  MLV: makeLeague('MLV', 'mlv', 'Major League Volleyball', 'sky'),
}

export function leaguePath(name: LeagueName) {
  return `/leagues/${leagueData[name].slug}`
}
