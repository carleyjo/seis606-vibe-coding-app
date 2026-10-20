import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { leagueData } from '../data'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
    const slug = String(input).split('/').pop()
    const league = Object.values(leagueData).find((item) => item.slug === slug)
    const data = slug === 'leagues' ? Object.values(leagueData) : league
    return { ok: Boolean(data), status: data ? 200 : 404, json: async () => data ? { data } : { error: 'Not found' } }
  }))
})
afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.unstubAllGlobals()
})
