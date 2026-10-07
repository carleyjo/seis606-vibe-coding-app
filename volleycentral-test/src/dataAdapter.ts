import { leagueData } from './data'
import type { LeagueData, LeagueName } from './types'

export interface DataAdapter {
  getLeague(name: LeagueName): Promise<LeagueData>
  getLeagues(): Promise<LeagueData[]>
}

export const sampleDataAdapter: DataAdapter = {
  async getLeague(name) {
    return leagueData[name]
  },
  async getLeagues() {
    return Object.values(leagueData)
  },
}
