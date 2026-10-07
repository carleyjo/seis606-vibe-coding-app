import { describe, expect, it } from 'vitest'
import { sampleDataAdapter } from '../dataAdapter'
import { leagueNames } from '../types'

describe('sample data adapter', () => {
  it('returns all five typed league records', async () => {
    const leagues = await sampleDataAdapter.getLeagues()
    expect(leagues.map((league) => league.name)).toEqual([...leagueNames])
    expect(leagues.every((league) => league.scores.length === 3 && league.schedules.length === 2 && league.standings.length === 10 && league.news.length === 3)).toBe(true)
  })

  it('returns the requested league record', async () => {
    const league = await sampleDataAdapter.getLeague('NCAA D1')
    expect(league.name).toBe('NCAA D1')
    expect(league.schedules[0].whereToWatch).toBe('Sample listing: check official site')
  })
})
