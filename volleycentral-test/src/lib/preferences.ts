import type { Preferences } from '../types'

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
