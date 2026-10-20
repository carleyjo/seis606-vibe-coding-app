import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildNcaaD1Url, getDatePath, NcaaD1Adapter } from '../../server/adapters'
import { mapNcaaD1Scoreboard } from '../../server/ncaaD1Mapper'
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

describe('NCAA D1 live adapter', () => {
  const originalUrl = process.env.NCAA_D1_API_URL
  const originalTimeZone = process.env.NCAA_D1_TIME_ZONE

  afterEach(() => {
    if (originalUrl === undefined) delete process.env.NCAA_D1_API_URL
    else process.env.NCAA_D1_API_URL = originalUrl
    if (originalTimeZone === undefined) delete process.env.NCAA_D1_TIME_ZONE
    else process.env.NCAA_D1_TIME_ZONE = originalTimeZone
    vi.useRealTimers()
  })

  it('generates a timezone-aware YYYY/MM/DD endpoint', () => {
    const datePath = getDatePath('America/Chicago')
    expect(datePath).toMatch(/^\d{4}\/\d{2}\/\d{2}$/)
    expect(buildNcaaD1Url('https://example.test/d1/', 'America/Chicago')).toMatch(/^https:\/\/example\.test\/d1\/\d{4}\/\d{2}\/\d{2}\/all-conf$/)
  })

  it('maps NCAA scoreboard games into provider LeagueData', () => {
    const league = mapNcaaD1Scoreboard({
      games: [
        {
          game: {
            gameID: '123',
            title: 'Team A Team B',
            away: { score: '1', names: { short: 'Team A' } },
            home: { score: '3', names: { short: 'Team B' } },
            finalMessage: 'FINAL',
            startDate: '10/19/2026',
            network: 'ESPN+',
          },
        },
        { game: undefined },
        { game: { gameID: '', title: '', away: {}, home: {} } },
      ],
    })
    expect(league.source).toBe('provider')
    expect(league.scores).toHaveLength(1)
    expect(league.scores[0].homeTeam).toBe('Team B')
    expect(league.schedules[0].whereToWatch).toBe('ESPN+')
  })

  it('returns unchanged sample data when the endpoint is missing', async () => {
    delete process.env.NCAA_D1_API_URL
    const league = await new NcaaD1Adapter().getLeague()
    expect(league.source).toBe('sample')
    expect(league.scores[0].matchup).toContain('NCAA D1 Sample Team')
  })

  it('falls back to sample data for invalid scoreboard payloads', async () => {
    process.env.NCAA_D1_API_URL = 'https://example.test/d1'
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, status: 200, json: async () => ({}) })))
    await expect(new NcaaD1Adapter().getLeague()).resolves.toMatchObject({ source: 'sample' })
  })

  it('falls back to sample data after a provider timeout', async () => {
    process.env.NCAA_D1_API_URL = 'https://example.test/d1'
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn((_url: string, options: RequestInit) => new Promise((_resolve, reject) => {
      options.signal?.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })))
    })))
    const pending = expect(new NcaaD1Adapter().getLeague()).resolves.toMatchObject({ source: 'sample' })
    await vi.advanceTimersByTimeAsync(10_000)
    await pending
  })
})
