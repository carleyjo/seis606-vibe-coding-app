import { beforeEach, describe, expect, it } from 'vitest'
import { getVisibleLeagues, preferencesStorageKey, readPreferences, savePreferences } from '../lib/preferences'
import { leagueData } from '../data'
import type { Preferences } from '../types'

const savedPreferences: Preferences = { profile: 'Casual Fan', leagues: ['LOVB', 'NCAA D2'] }

describe('preferences storage', () => {
  beforeEach(() => localStorage.clear())

  it('writes and reads valid preferences', () => {
    savePreferences(savedPreferences)
    expect(readPreferences()).toEqual(savedPreferences)
  })

  it('removes corrupted JSON', () => {
    localStorage.setItem(preferencesStorageKey, '{not-json')
    expect(readPreferences()).toBeNull()
    expect(localStorage.getItem(preferencesStorageKey)).toBeNull()
  })

  it('removes tampered preference shapes and invalid league values', () => {
    localStorage.setItem(preferencesStorageKey, JSON.stringify({ profile: 'Casual Fan', leagues: ['Not a league'] }))
    expect(readPreferences()).toBeNull()
    expect(localStorage.getItem(preferencesStorageKey)).toBeNull()
  })

  it('returns selected leagues in preference order and all leagues without valid preferences', () => {
    const allLeagues = Object.values(leagueData)
    expect(getVisibleLeagues(allLeagues, savedPreferences).map((league) => league.name)).toEqual(['LOVB', 'NCAA D2'])
    expect(getVisibleLeagues(allLeagues, null)).toEqual(allLeagues)
  })
})
