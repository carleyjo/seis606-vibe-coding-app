type CacheEntry<T> = { value: T; expiresAt: number }

export interface Cache {
  get<T>(key: string): T | undefined
  set<T>(key: string, value: T, ttlSeconds: number): void
  clear(): void
}

export class MemoryCache implements Cache {
  private readonly entries = new Map<string, CacheEntry<unknown>>()

  get<T>(key: string): T | undefined {
    const entry = this.entries.get(key)
    if (!entry || entry.expiresAt <= Date.now()) {
      this.entries.delete(key)
      return undefined
    }
    return entry.value as T
  }

  set<T>(key: string, value: T, ttlSeconds: number): void {
    this.entries.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 })
  }

  clear(): void {
    this.entries.clear()
  }
}

export const cache = new MemoryCache()
