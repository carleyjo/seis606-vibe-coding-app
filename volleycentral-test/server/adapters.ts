import type { LeagueData } from '../src/types.js'
import type { LeagueId } from '../src/officialSources.js'
import { getServerEnv } from './config.js'
import { leagueData } from '../src/data.js'
import { mapNcaaD1NewsHtml, mapNcaaD1Scoreboard, mapNcaaD1StandingsHtml, type NcaaScoreboardResponse } from './ncaaD1Mapper.js'

export interface LeagueAdapter {
  readonly leagueId: LeagueId
  getLeague(): Promise<LeagueData>
}

const leagueById: Record<LeagueId, LeagueData> = {
  'ncaa-d1': leagueData['NCAA D1'],
  'ncaa-d2': leagueData['NCAA D2'],
  'ncaa-d3': leagueData['NCAA D3'],
  lovb: leagueData.LOVB,
  mlv: leagueData.MLV,
}

function isLeagueData(value: unknown): value is LeagueData {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<LeagueData>
  return Array.isArray(candidate.scores) && Array.isArray(candidate.schedules) && Array.isArray(candidate.standings)
}

const ncaaD1StandingsUrl = 'https://www.ncaa.com/rankings/volleyball-women/d1/di-committees-top-16'
const ncaaD1NewsUrl = 'https://www.ncaa.com/sports/volleyball-women/d1'

export function getDatePath(timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const values = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]))
  return `${values.year}/${values.month}/${values.day}`
}

export function buildNcaaD1Url(baseUrl: string, timeZone: string): string {
  return `${baseUrl.replace(/\/$/, '')}/${getDatePath(timeZone)}/all-conf`
}

abstract class ConfiguredLeagueAdapter implements LeagueAdapter {
  abstract readonly leagueId: LeagueId

  async getLeague(): Promise<LeagueData> {
    const env = getServerEnv()
    const endpoint = env.endpoints[this.leagueId]
    if (!endpoint) return { ...leagueById[this.leagueId], fetchedAt: new Date().toISOString(), source: 'sample' }

    const headers: Record<string, string> = { Accept: 'application/json' }
    const apiKey = env.apiKeys[this.leagueId]
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`
    const response = await fetch(endpoint, { headers })
    if (!response.ok) throw new Error(`${this.leagueId} provider returned HTTP ${response.status}`)
    const payload: unknown = await response.json()
    if (!isLeagueData(payload)) throw new Error(`${this.leagueId} provider returned an invalid normalized payload`)
    return { ...payload, fetchedAt: new Date().toISOString(), source: 'provider' }
  }
}

export class NcaaD1Adapter extends ConfiguredLeagueAdapter {
  readonly leagueId = 'ncaa-d1' as const

  override async getLeague(): Promise<LeagueData> {
    const env = getServerEnv()
    const baseUrl = env.endpoints[this.leagueId]
    if (!baseUrl) return super.getLeague()

    const headers: Record<string, string> = { Accept: 'application/json' }
    const apiKey = env.apiKeys[this.leagueId]
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)
    try {
      const response = await fetch(buildNcaaD1Url(baseUrl, env.ncaaD1TimeZone), { headers, signal: controller.signal })
      if (!response.ok) throw new Error(`${this.leagueId} provider returned HTTP ${response.status}`)
      const payload: unknown = await response.json()
      if (!payload || typeof payload !== 'object' || !Array.isArray((payload as { games?: unknown }).games)) {
        throw new Error(`${this.leagueId} provider returned an invalid scoreboard payload`)
      }
      const league = mapNcaaD1Scoreboard(payload as NcaaScoreboardResponse)
      const [standings, news] = await Promise.all([
        fetchNcaaD1Html(ncaaD1StandingsUrl).then(mapNcaaD1StandingsHtml).catch((error: unknown) => {
          console.error('NCAA D1 standings request failed; using sample standings', error)
          return leagueById[this.leagueId].standings
        }),
        fetchNcaaD1Html(ncaaD1NewsUrl).then(mapNcaaD1NewsHtml).catch((error: unknown) => {
          console.error('NCAA D1 news request failed; using sample news', error)
          return leagueById[this.leagueId].news
        }),
      ])
      return { ...league, standings, news }
    } catch (error) {
      console.error(`${this.leagueId} provider request failed; using sample data`, error)
      return { ...leagueById[this.leagueId], fetchedAt: new Date().toISOString(), source: 'sample' }
    } finally {
      clearTimeout(timeout)
    }

    async function fetchNcaaD1Html(url: string): Promise<string> {
      const response = await fetch(url, { headers: { Accept: 'text/html' } })
      if (!response.ok) throw new Error(`NCAA D1 content returned HTTP ${response.status}`)
      return response.text()
    }
  }
}

export class NcaaD2Adapter extends ConfiguredLeagueAdapter { readonly leagueId = 'ncaa-d2' as const }
export class NcaaD3Adapter extends ConfiguredLeagueAdapter { readonly leagueId = 'ncaa-d3' as const }
export class LovbAdapter extends ConfiguredLeagueAdapter { readonly leagueId = 'lovb' as const }
export class MlvAdapter extends ConfiguredLeagueAdapter { readonly leagueId = 'mlv' as const }

export function createLeagueAdapters(): LeagueAdapter[] {
  return [new NcaaD1Adapter(), new NcaaD2Adapter(), new NcaaD3Adapter(), new LovbAdapter(), new MlvAdapter()]
}
