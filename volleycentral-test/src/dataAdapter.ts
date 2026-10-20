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

type ApiResponse<T> = { data: T; error?: never } | { data?: never; error: string }

async function request<T>(path: string): Promise<T> {
  const response = await fetch(path)
  const body = await response.text()
  let payload: ApiResponse<T>
  try {
    payload = JSON.parse(body) as ApiResponse<T>
  } catch (error) {
    throw new Error(`Request failed with HTTP ${response.status}: server returned an invalid response`, { cause: error })
  }
  if (!response.ok || !payload.data) {
    throw new Error(payload.error ?? `Request failed with HTTP ${response.status}`)
  }
  return payload.data
}

export const apiDataAdapter: DataAdapter = {
  getLeague(name) {
    return request<LeagueData>(`/api/leagues/${leagueData[name].slug}`)
  },
  getLeagues() {
    return request<LeagueData[]>('/api/leagues')
  },
}
