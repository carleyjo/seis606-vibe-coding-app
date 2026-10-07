import type { LeagueData, LeagueName } from './types'

const sampleScores = (label: string) => [
  { matchup: `${label} Sample Team A 2  ·  ${label} Sample Team B 2`, result: 'Set 5', status: 'Live today' },
  { matchup: `${label} Sample Team C 3  ·  ${label} Sample Team D 1`, result: 'Final today', status: 'Today' },
  { matchup: `${label} Sample Team E  ·  ${label} Sample Team F`, result: 'Upcoming today', status: 'Today' },
]

const sampleSchedules = (label: string) => [
  { date: 'Today', matchup: `${label} Sample Team E vs ${label} Sample Team F`, venue: 'Sample Arena', whereToWatch: 'Sample listing: check official site' },
  { date: 'Tomorrow', matchup: `${label} Sample Team G vs ${label} Sample Team H`, venue: 'Sample Events Center', whereToWatch: 'Sample listing: check official site' },
]

const sampleStandings = (label: string) => Array.from({ length: 10 }, (_, index) => ({
  team: `${label} Sample Team ${String(index + 1).padStart(2, '0')}`,
  record: `${19 - index}-${index + 1}`,
  points: `${570 - index * 24}`,
}))

const sampleNews = (label: string) => [
  { title: `${label} sample news item one`, source: 'Official sample source', age: 'This week' },
  { title: `${label} sample news item two`, source: 'Official sample source', age: 'This week' },
  { title: `${label} sample news item three`, source: 'Official sample source', age: 'This week' },
]

function makeLeague(name: LeagueName, slug: string, detail: string, tone: string): LeagueData {
  return { name, slug, detail, tone, scores: sampleScores(name), schedules: sampleSchedules(name), standings: sampleStandings(name), news: sampleNews(name) }
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
