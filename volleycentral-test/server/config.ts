import type { LeagueId } from '../src/officialSources'

type ServerEnv = {
  cacheTtlSeconds: number
  endpoints: Partial<Record<LeagueId, string>>
  apiKeys: Partial<Record<LeagueId, string>>
}

function readNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export function getServerEnv(): ServerEnv {
  return {
    cacheTtlSeconds: readNumber(process.env.VOLLEYCENTRAL_CACHE_TTL_SECONDS, 60),
    endpoints: {
      'ncaa-d1': process.env.NCAA_D1_API_URL,
      'ncaa-d2': process.env.NCAA_D2_API_URL,
      'ncaa-d3': process.env.NCAA_D3_API_URL,
      lovb: process.env.LOVB_API_URL,
      mlv: process.env.MLV_API_URL,
    },
    apiKeys: {
      'ncaa-d1': process.env.NCAA_D1_API_KEY,
      'ncaa-d2': process.env.NCAA_D2_API_KEY,
      'ncaa-d3': process.env.NCAA_D3_API_KEY,
      lovb: process.env.LOVB_API_KEY,
      mlv: process.env.MLV_API_KEY,
    },
  }
}
