import type { LeagueData, NewsItem, Schedule, Score, Standing } from '../src/types.js'
import { leagueData } from '../src/data.js'

export type NcaaScoreboardTeam = {
  score?: string
  names?: {
    short?: string
    full?: string
  }
  winner?: boolean
}

export type NcaaScoreboardGame = {
  gameID: string
  away: NcaaScoreboardTeam
  home: NcaaScoreboardTeam
  title: string
  finalMessage?: string
  gameState?: string
  startTime?: string
  startDate?: string
  url?: string
  network?: string
}

export type NcaaScoreboardResponse = {
  updated_at?: string
  games?: Array<{ game?: NcaaScoreboardGame }>
}

function decodeHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#039;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function absoluteNcaaUrl(path: string): string {
  return path.startsWith('http') ? path : `https://www.ncaa.com${path}`
}

export function mapNcaaD1StandingsHtml(html: string): Standing[] {
  const rowPattern = /<tr[^>]*>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<\/tr>/gis
  return [...html.matchAll(rowPattern)].flatMap((match) => {
    const rank = Number(decodeHtml(match[1]))
    const team = decodeHtml(match[2])
    const record = decodeHtml(match[3])
    return Number.isInteger(rank) && rank > 0 && team && record ? [{ rank, team, record, points: '' }] : []
  })
}

export function mapNcaaD1NewsHtml(html: string): NewsItem[] {
  const linkPattern = /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis
  const seen = new Set<string>()
  return [...html.matchAll(linkPattern)].flatMap((match) => {
    const path = match[1]
    const title = decodeHtml(match[2])
    if ((!path.startsWith('/news/') && !path.startsWith('/video/')) || !title || seen.has(path)) return []
    seen.add(path)
    const dateMatch = path.match(/\/(\d{4}-\d{2}-\d{2})\//)
    return [{ title, source: 'NCAA.com', age: dateMatch?.[1] ?? 'NCAA coverage', url: absoluteNcaaUrl(path) }]
  }).slice(0, 3)
}

function teamName(team: NcaaScoreboardTeam | undefined): string {
  return team?.names?.short || team?.names?.full || 'Unknown team'
}

function gameStatus(game: NcaaScoreboardGame): string {
  return game.finalMessage || game.gameState || 'Scheduled'
}

function gameDate(game: NcaaScoreboardGame): string {
  return game.startDate || game.startTime || 'Date unavailable'
}

export function mapNcaaD1Scoreboard(payload: NcaaScoreboardResponse, fetchedAt = new Date().toISOString()): LeagueData {
  const games = (payload.games ?? [])
    .flatMap((entry) => entry.game ? [entry.game] : [])
    .filter((game) => Boolean(game.gameID) && teamName(game.home) !== 'Unknown team' && teamName(game.away) !== 'Unknown team')
  const scores: Score[] = games.map((game) => {
    const homeTeam = teamName(game.home)
    const awayTeam = teamName(game.away)
    return {
      id: game.gameID,
      matchup: `${awayTeam}  ·  ${homeTeam}`,
      result: gameStatus(game),
      status: game.startDate ?? 'Today',
      homeTeam,
      awayTeam,
      homeSets: game.home.score ? Number(game.home.score) : undefined,
      awaySets: game.away.score ? Number(game.away.score) : undefined,
    }
  })
  const schedules: Schedule[] = games.map((game) => {
    const homeTeam = teamName(game.home)
    const awayTeam = teamName(game.away)
    return {
      id: game.gameID,
      date: gameDate(game),
      matchup: `${awayTeam} vs ${homeTeam}`,
      venue: 'Venue unavailable from scoreboard',
      whereToWatch: game.network || 'Check official NCAA listing',
      homeTeam,
      awayTeam,
    }
  })
  const standings: Standing[] = []
  const news: NewsItem[] = []
  const metadata = leagueData['NCAA D1']
  return {
    ...metadata,
    scores,
    schedules,
    standings,
    news,
    fetchedAt,
    source: 'provider',
  }
}
