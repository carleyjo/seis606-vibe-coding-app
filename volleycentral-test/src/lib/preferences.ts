import { leagueNames, type LeagueName, type Preferences } from '../types'

export const preferencesStorageKey = 'volleycentral-preferences'

export function readPreferences(): Preferences | null {
  const saved = localStorage.getItem(preferencesStorageKey)
  if (!saved) return null
  try {
    return JSON.parse(saved) as Preferences
  } catch {
    localStorage.removeItem(preferencesStorageKey)
    return null
  }
}

export function savePreferences(preferences: Preferences) {
  localStorage.setItem(preferencesStorageKey, JSON.stringify(preferences))
}

export function getVisibleLeagues<T extends { name: LeagueName }>(items: T[], preferences: Preferences | null): T[] {
  if (!preferences || preferences.leagues.length === 0 || !preferences.leagues.every((league) => leagueNames.includes(league))) return items
  return preferences.leagues.map((league) => items.find((item) => item.name === league)).filter((item): item is T => Boolean(item))
}
