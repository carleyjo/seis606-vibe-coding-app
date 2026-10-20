import type { LeagueData, NewsItem, Schedule, Score, Standing } from '../src/types'
import { leagueData } from '../src/data'

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

function teamName(team: NcaaScoreboardTeam): string {
  return team.names?.short || team.names?.full || 'Unknown team'
}

function gameStatus(game: NcaaScoreboardGame): string {
  return game.finalMessage || game.gameState || 'Scheduled'
}

function gameDate(game: NcaaScoreboardGame): string {
  return game.startDate || game.startTime || 'Date unavailable'
}

export function mapNcaaD1Scoreboard(payload: NcaaScoreboardResponse, fetchedAt = new Date().toISOString()): LeagueData {
  const games = (payload.games ?? []).flatMap((entry) => entry.game ? [entry.game] : [])
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
