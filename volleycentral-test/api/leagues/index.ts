import type { VercelRequest, VercelResponse } from '@vercel/node'
import { leagueRegistry } from '../../server/registry.js'

export default async function handler(_request: VercelRequest, response: VercelResponse) {
  try {
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    response.status(200).json({ data: await leagueRegistry.getLeagues() })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load league data'
    response.setHeader('Content-Type', 'application/json')
    response.status(502).json({ error: message })
  }
}
