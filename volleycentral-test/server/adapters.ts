import { leagueData } from '../src/data'
import type { LeagueData } from '../src/types'
import type { LeagueId } from '../src/officialSources'
import { getServerEnv } from './config'
import { mapNcaaD1Scoreboard, type NcaaScoreboardResponse } from './ncaaD1Mapper'

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
    const endpoint = env.endpoints[this.leagueId]
    if (!endpoint) return super.getLeague()

    const headers: Record<string, string> = { Accept: 'application/json' }
    const apiKey = env.apiKeys[this.leagueId]
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`
    const response = await fetch(endpoint, { headers })
    if (!response.ok) throw new Error(`${this.leagueId} provider returned HTTP ${response.status}`)
    const payload = await response.json() as NcaaScoreboardResponse
    return mapNcaaD1Scoreboard(payload)
  }
}
export class NcaaD2Adapter extends ConfiguredLeagueAdapter { readonly leagueId = 'ncaa-d2' as const }
export class NcaaD3Adapter extends ConfiguredLeagueAdapter { readonly leagueId = 'ncaa-d3' as const }
export class LovbAdapter extends ConfiguredLeagueAdapter { readonly leagueId = 'lovb' as const }
export class MlvAdapter extends ConfiguredLeagueAdapter { readonly leagueId = 'mlv' as const }

export function createLeagueAdapters(): LeagueAdapter[] {
  return [new NcaaD1Adapter(), new NcaaD2Adapter(), new NcaaD3Adapter(), new LovbAdapter(), new MlvAdapter()]
}
