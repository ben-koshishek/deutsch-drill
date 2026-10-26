import Dexie, { type EntityTable } from 'dexie'
import type { SessionResult, DeckStats } from '@/types'

const db = new Dexie('DeutschDrillDB') as Dexie & {
  sessionResults: EntityTable<SessionResult, 'id'>
  deckStats: EntityTable<DeckStats, 'id'>
}

db.version(1).stores({
  sessionResults: '++id, deckId, completedAt',
  deckStats: '++id, &deckId',
})

export async function saveSessionResult(result: Omit<SessionResult, 'id'>): Promise<void> {
  await db.sessionResults.add(result as SessionResult)

  const existing = await db.deckStats.where('deckId').equals(result.deckId).first()

  if (existing) {
    const updates: Partial<DeckStats> = {
      totalAttempts: existing.totalAttempts + 1,
      totalWins: existing.totalWins + (result.won ? 1 : 0),
    }

    if (result.won) {
      if (existing.bestTimeMs === null || result.durationMs < existing.bestTimeMs) {
        updates.bestTimeMs = result.durationMs
      }
      if (existing.bestMistakes === null || result.mistakeCount < existing.bestMistakes) {
        updates.bestMistakes = result.mistakeCount
      }
    }

    await db.deckStats.update(existing.id!, updates)
  } else {
    await db.deckStats.add({
      deckId: result.deckId,
      bestTimeMs: result.won ? result.durationMs : null,
      bestMistakes: result.won ? result.mistakeCount : null,
      totalAttempts: 1,
      totalWins: result.won ? 1 : 0,
    })
  }
}

export async function getDeckStats(deckId: string): Promise<DeckStats | null> {
  const stats = await db.deckStats.where('deckId').equals(deckId).first()
  return stats ?? null
}

export async function getRecentSessions(deckId: string, limit = 10): Promise<SessionResult[]> {
  return db.sessionResults
    .where('deckId')
    .equals(deckId)
    .reverse()
    .sortBy('completedAt')
    .then((results) => results.slice(0, limit))
}

export { db }
