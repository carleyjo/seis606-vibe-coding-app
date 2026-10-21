import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { LeagueId } from '../../src/officialSources.js'
import { leagueRegistry } from '../../server/registry.js'

const leagueIds: LeagueId[] = ['ncaa-d1', 'ncaa-d2', 'ncaa-d3', 'lovb', 'mlv']

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const leagueId = request.query.leagueId
  if (typeof leagueId !== 'string' || !leagueIds.includes(leagueId as LeagueId)) {
    response.status(400).json({ error: 'Unknown league id' })
    return
  }
  try {
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    response.status(200).json({ data: await leagueRegistry.getLeague(leagueId as LeagueId) })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load league data'
    response.setHeader('Content-Type', 'application/json')
    response.status(502).json({ error: message })
  }
}
