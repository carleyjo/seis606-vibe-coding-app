import type { LeagueData } from '../src/types.js'
import type { LeagueId } from '../src/officialSources.js'
import { cache } from './cache.js'
import { getServerEnv } from './config.js'
import { createLeagueAdapters, type LeagueAdapter } from './adapters.js'

export class LeagueRegistry {
  private readonly adapters: ReadonlyMap<LeagueId, LeagueAdapter>

  constructor(adapters: LeagueAdapter[] = createLeagueAdapters()) {
    this.adapters = new Map(adapters.map((adapter) => [adapter.leagueId, adapter]))
  }

  async getLeague(leagueId: LeagueId): Promise<LeagueData> {
    const key = `league:${leagueId}`
    const cached = cache.get<LeagueData>(key)
    if (cached) return cached
    const adapter = this.adapters.get(leagueId)
    if (!adapter) throw new Error(`Unsupported league: ${leagueId}`)
    const data = await adapter.getLeague()
    cache.set(key, data, getServerEnv().cacheTtlSeconds)
    return data
  }

  async getLeagues(): Promise<LeagueData[]> {
    return Promise.all([...this.adapters.keys()].map((leagueId) => this.getLeague(leagueId)))
  }
}

export const leagueRegistry = new LeagueRegistry()
