import Dexie, { type Table } from 'dexie';
import type { DrillDirection } from './types';

interface Progress {
  id?: number;
  deckId: string;
  wordId: string;
  direction: DrillDirection;
  streak: number;
}

class DrillDatabase extends Dexie {
  progress!: Table<Progress>;

  constructor() {
    super('deutschdrill');
    this.version(1).stores({
      progress: '++id, [deckId+wordId+direction]'
    });
  }
}

export const db = new DrillDatabase();

export async function getProgress(
  deckId: string,
  wordId: string,
  direction: DrillDirection
): Promise<number> {
  const record = await db.progress
    .where({ deckId, wordId, direction })
    .first();
  return record?.streak ?? 0;
}

export async function setProgress(
  deckId: string,
  wordId: string,
  direction: DrillDirection,
  streak: number
): Promise<void> {
  const existing = await db.progress
    .where({ deckId, wordId, direction })
    .first();

  if (existing) {
    await db.progress.update(existing.id!, { streak });
  } else {
    await db.progress.add({ deckId, wordId, direction, streak });
  }
}

export async function getDeckProgress(
  deckId: string
): Promise<Map<string, number>> {
  const records = await db.progress.where({ deckId }).toArray();
  const map = new Map<string, number>();
  for (const r of records) {
    map.set(`${r.wordId}_${r.direction}`, r.streak);
  }
  return map;
}

export async function resetDeckProgress(deckId: string): Promise<void> {
  await db.progress.where({ deckId }).delete();
}
