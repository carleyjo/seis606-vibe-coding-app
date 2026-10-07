import { leagueNames, type LeagueName, type Preferences } from '../types'

export const preferencesStorageKey = 'volleycentral-preferences'

export function readPreferences(): Preferences | null {
  const saved = localStorage.getItem(preferencesStorageKey)
  if (!saved) return null
  try {
    const parsed: unknown = JSON.parse(saved)
    if (!isPreferences(parsed)) throw new Error('Invalid preferences')
    return parsed
  } catch {
    localStorage.removeItem(preferencesStorageKey)
    return null
  }
}

function isPreferences(value: unknown): value is Preferences {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<Preferences>
  return typeof candidate.profile === 'string' && leagueNames.includes(candidate.profile as (typeof leagueNames)[number]) && Array.isArray(candidate.leagues) && candidate.leagues.length > 0 && candidate.leagues.every((league) => typeof league === 'string' && leagueNames.includes(league as (typeof leagueNames)[number]))
}

export function savePreferences(preferences: Preferences) {
  localStorage.setItem(preferencesStorageKey, JSON.stringify(preferences))
}

export function getVisibleLeagues<T extends { name: LeagueName }>(items: T[], preferences: Preferences | null): T[] {
  if (!preferences || preferences.leagues.length === 0 || !preferences.leagues.every((league) => leagueNames.includes(league))) return items
  return preferences.leagues.map((league) => items.find((item) => item.name === league)).filter((item): item is T => Boolean(item))
}
